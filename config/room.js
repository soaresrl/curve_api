const model = require("../cmodel/model");

module.exports = class room {
    constructor(token, admin){
        this.admin = admin;
        this.model = null;
        this.users = [];
        this.token = token; 
    }

    removeUser(user){
        for (let i = 0; i < this.users.length; i++) {
            
            if (this.users[i] === user) {
                this.users.splice(i,1);
            }
        }
    }
}