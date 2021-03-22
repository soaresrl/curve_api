const Loop = require('../entities/loop');
const HalfEdge = require('../entities/halfEdge');
const eulerOperator = require('./euleroperator');
const kvfs = require('./kvfs');

module.exports = class mvfs extends eulerOperator {
    constructor(vtx, face){
        this.vtx = vtx;
        this.face = face;
    }

    execute(){
        const loop_out = new Loop(this.face);
        const new_loop = new Loop(this.face);
        const he = new HalfEdge();
        this.loopSetHe(new_loop, he);
        this.halfEdgeSetLoop(he, new_loop);
        this.halfEdgeSetNxt(he, he);
        this.halfEdgeSetPrv(he, he);
        this.halfEdgeSetVtx(he, this.vtx);
        this.halfEdgeSetEdge(he, null);
        this.vertexSetHE(this.vtx, he);
    }

    unexecute(){
        var KVFS = new kvfs(this.vtx, this.face);
        KVFS.execute();
    }
}