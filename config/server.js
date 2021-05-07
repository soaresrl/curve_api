const line = require("../geomlib/line");
const customExpress = require("./customExpress");
const room = require("./room");
const user = require("./user");
const path = require('path');
const fs = require('fs');
const dl = require('delivery');
const express = require('express');
const socketIO = require('socket.io');


module.exports = class server {
    constructor(){
        this.users = [];
        this.rooms = [];
    }

    start(){

        const PORT = process.env.PORT || 3000;

        const server = express()
        .listen(PORT, () => console.log(`Listening on ${PORT}`));

        const io = socketIO(server, {
            cors: {
              origin: '*',
            }
          });

        io.on('connection', (socket) => {
            console.log(`A user connected: ${socket.id}`);
            this.users.push(new user(socket));

            socket.on('create-room', ()=>{
                try {
                    var user = this.getUser(socket);
                    if (user) {
                        var createdRoom = new room(socket.id, user);
                        user.isAdmin = true;
                        createdRoom.model = user.model;
                        
                        user.room = createdRoom;
                        this.rooms.push(createdRoom);
                        console.log('room created');
                        socket.emit('room-created', socket.id);
                    }
                    else
                    {
                        throw "Couldn't create room check your connection."
                    }
                } catch (e) {
                    
                }
            })

            socket.on('join-room', (token)=>{
                try{
                    //insert function to copy the admin model when joining to the room
                    var user = this.getUser(socket);
                    var room = this.getRoom(token);
                    if(user && room){
                        room.users.push(user);
                        user.room = room;
                        room.admin.socket.emit('user-joined', user.socket.id);
                        console.log(`user connected to room: ${token}`);
                        socket.emit('room-joined', token);
                        room.model.curves.forEach(curve => {
                            socket.emit('insert-curve', curve);
                        });
                    }
                    else
                    {
                        throw "The room doesn't exist";
                    }
                }
                catch(e){
                    socket.emit('error', `${e}`);
                }
            })
            
            socket.on('insert-curve', (curve)=>{
                var user = this.getUser(socket);
                if(user.isAdmin){
                    var room = this.getRoom(user.socket.id);
                    room.model.insertCurve(new line(curve.x1, curve.y1, curve.x2, curve.y2));
                    room.users.forEach(usr =>{
                        usr.socket.emit('insert-curve', curve);
                    })
                }
                else if (user.room) {
                    var room = user.room;
                    room.model.insertCurve(new line(curve.x1, curve.y1, curve.x2, curve.y2));
                    room.users.forEach(usr =>{   
                        //send the iserted curve to the other room's users
                        if (socket.id !== usr.socket.id) {
                            usr.socket.emit('insert-curve', curve);
                        }
                    });
                    room.admin.socket.emit('insert-curve', curve);
                    
                } 
                else
                {
                    user.model.insertCurve(new line(curve.x1, curve.y1, curve.x2, curve.y2));
                }
            })

            socket.on('select-fence', (xmin, xmax, ymin, ymax)=>{
                
                var user = this.getUser(socket);
                if(user.isAdmin) 
                {
                    var room = this.getRoom(user.socket.id);
                    
                    room.model.selectFence(xmin, xmax, ymin, ymax);
                    console.log(room.model.curves);
                }
                else if (user.room) {
                    var room = user.room;

                    room.model.selectFence(xmin, xmax, ymin, ymax);
                    console.log(room.model.curves);
                } 
                else
                {
                    user.model.selectFence(xmin, xmax, ymin, ymax);
                }
            })

            socket.on('select-pick', (x, y, tol)=>{
                const user = this.getUser(socket);
                if(user.isAdmin) 
                {
                    const room = this.getRoom(user.socket.id);
                    
                    room.model.selectPick(x, y, tol);
                }
                else if (user.room) {
                    const room = user.room;

                    room.model.selectPick(x, y, tol);
                } 
                else
                {
                    user.model.selectPick(x, y, tol);
                }
            })

            socket.on('intersect', ()=>{
                const user = this.getUser(socket);
                if(user.isAdmin) 
                {
                    const room = this.getRoom(user.socket.id);
                    
                    room.model.intersectTwoCurves();
                    room.users.forEach(usr => {
                        usr.socket.emit('update-model', room.model);
                    });
                } 
                else if (user.room) {
                    const room = user.room;

                    room.model.intersectTwoCurves();
                    room.users.forEach(usr => {
                        usr.socket.emit('update-model', room.model);
                    });
                    room.admin.socket.emit('update-model', room.model);
                } 
                else
                {
                    user.model.intersectTwoCurves();
                }

            })

            socket.on('delete-curves', ()=>{
                const user = this.getUser(socket);

                if(user.isAdmin) 
                {
                    const room = this.getRoom(user.socket.id);
                    
                    room.model.delSelectedCurves();
                    room.users.forEach(usr => {
                        usr.socket.emit('update-model', room.model);
                    });
                } 
                else if (user.room) {
                    const room = user.room;

                    room.model.delSelectedCurves();
                    room.users.forEach(usr => {
                        usr.socket.emit('update-model', room.model);
                    });
                    room.admin.socket.emit('update-model', room.model)
                } 
                else
                {
                    user.model.delSelectedCurves();
                }
            })

            socket.on('save-file', ()=>{
               this.saveIFC(socket);
            })
        
            socket.on('disconnect', ()=>{
                const user = this.getUser(socket);
                if(user.isAdmin)
                {
                    const room = this.getRoom(user.socket.id);
                    room.users.forEach(user => {
                        user.room = null;
                        user.socket.emit('room-disconnected');
                    });
                    this.removeRoom(room);
                }                
                else if (user.room) {
                    user.room.admin.socket.emit('user-disconnected', user.socket.id);
                    user.room.removeUser(user);
                } 
                this.removeUser(user);
                console.log(`User ${socket.id} disconnected.`);
            });
        });
        
        
        //http.listen(8080, ()=> console.log("API listening on port 8080"));
    }

    getUser(socket){
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].socket.id === socket.id) {
                return this.users[i];
            }
        }
    }

    getRoom(token){
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].token === token) {
                return this.rooms[i];
            }
        }
    }

    removeUser(user){
        for (let i = 0; i < this.users.length; i++) {
            if (user === this.users[i]) {
                this.users.splice(i,1);
            }
        }
    }

    removeRoom(room){
        for (let i = 0; i < this.rooms.length; i++) {
            if (room === this.rooms[i]) {
                this.rooms.splice(i,1);
            }
        }
    }

    saveIFC(socket){
        var user = this.getUser(socket);

        if (user.isAdmin) {
            var room = this.getRoom(user.socket.id);
            var filepath = path.join(__dirname,'files', `${user.socket.id}.ifc`);

            var data = new String();
            data += "ISO-10303-21;\n";
            data += "HEADER;\nFILE_DESCRIPTION(('ViewDefinition [CoordinationView]'), '2;1');\nFILE_NAME('', '2021-03-10T00:43:42', (''), (''), '', 'Web Curve Collector', '');\nFILE_SCHEMA(('IFC4X1'));\n";
            
            var building_model = room.model.building_model;
            var step_line;
            building_model.map_entities.forEach((value, key, map) => {
                console.log(value);
                data += value.getStepLine();
            });

            try {
                fs.writeFileSync(filepath, data);
                
                console.log('file-saved');
            } catch (error) {
                console.log(error);
            }

            user.socket.emit('file-saved');
        }
    }

    saveFile(socket){
        var user = this.getUser(socket);
        if (user.isAdmin) {
            var room = this.getRoom(user.socket.id);
            var filepath = path.join(__dirname,'files', `${user.socket.id}.json`);
            try {
                fs.writeFileSync(filepath, JSON.stringify(room.model));
                
                console.log('file-saved');
            } catch (error) {
                console.log(error);
            }

            /* var delivery = dl.listen(socket);
            delivery.on('delivery.connect',function(delivery){
            
                delivery.send({
                name: 'model.json',
                path : `./files/${user.socket.id}.json`,
                params: {foo: 'bar'}
                });
            
                delivery.on('send.success',function(file){
                    console.log('File successfully sent to client!');
                });
            
            }); */

            user.socket.emit('file-saved');
        }
    }
}