const eulerOperator = require("./euleroperator");
const loop = require('../entities/loop');
const mvfs = require("./mvfs");

module.exports = class kvfs extends eulerOperator {
    constructor(vtx, face){
        this.vtx = vtx;
        this.face = face;
    }

    execute(){

        this.vertexSetHE(this.vtx, null);
        this.faceSetLoop(this.face, null);

        delete this.face.loop;
        delete loop_out.nxt;
        delete this.vtx.he;
    }

    unexecute(){
        var MVFS = new mvfs(this.vtx, this.face);
        MVFS.execute();
    }
}