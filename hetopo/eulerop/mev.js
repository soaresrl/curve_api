const halfEdge = require("../entities/halfEdge");
const { EOrientation } = require("./EOrientation");
const eulerOperator = require("./euleroperator");

module.exports = class mev extends eulerOperator{
    constructor(edge, vtx){
        this.edge = edge;
        this.vtx = vtx;
        this.v_begin = null;
        this.v_next1 = null;
        this.v_next2 = null;
        this.face1 = null;
        this.face2 = null;
    }

    build(p_v_begin, p_v_next, p_face){
        this.v_begin = p_v_begin;
        this.v_next1 = p_v_next;
        this.v_next2 = p_v_next;
        this.face1 = p_face;
        this.face2 = p_face;
    }

    build_c(p_v_begin, p_v_next1, p_v_next2, p_face1, p_face2){
        this.v_begin = p_v_begin;
        this.v_next1 = p_v_next1;
        this.v_next2 = p_v_next2;
        this.face1 = p_face1;
        this.face2 = p_face2;
    }

    execute(){
        var he1 = halfEdge.inBetween(this.v_begin, this.v_next1, this.face1);
        var he2 = halfEdge.inBetween(this.v_begin, this.v_next2, this.face2);

        this.executeLowLevel(he1, he2);
    }

    unexecute(){

    }

    executeLowLevel(p_he1, p_he2){
        var he = p_he1;
        while (he !== p_he2) {
            this.halfEdgeSetVtx(he, this.vtx);
            he = he.mate().nxt;
        }

        this.edgeAddHe(this.edge, p_he2.vtx, p_he1, EOrientation.minus);
        this.edgeAddHe(this.edge, this.vtx, p_he2, EOrientation.plus);
        
        this.vertexSetHE(this.vtx, p_he2.prv);
        this.vertexSetHE(p_he2.vtx, p_he2);
    }
    //implement clone later
}