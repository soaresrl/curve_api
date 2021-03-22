const eulerOperator = require("./euleroperator");
const mev = require("./mev");

module.exports = class kev extends eulerOperator{
    constructor(p_edge, p_vtx){
        this.edge = p_edge;
        this.vtx = p_vtx;
        this.v_begin = null;
        this.v_next1 = null;
        this.v_next2 = null;
        this.face1 = null;
        this.face2 = null;
    }

    build(){
        var he1 = this.edge.he1;
        var he2 = this.edge.he2;

        if (he1.vtx !== this.vtx) {
            let temp = he1;
            he1 = he2;
            he2 = temp;
        }

        this.v_begin = he2.vtx;

        if (he2.nxt === he1 && he1.nxt === he2) {
            this.v_next1 = this.v_begin;
            this.v_next2 = this.v_begin;
        } 
        else if(he2.nxt !== he1 && he1.nxt === he2)
        {
            this.v_next1 = he2.nxt.mate().vtx;
            this.v_next2 = he1.nxt.mate().vtx;
        }
        else
        {
            this.v_next1 = he1.nxt.mate().vtx;
            this.v_next2 = he1.nxt.mate().vtx;
        }

        this.face1 = he1.loop.face;
        this.face2 = he2.loop.face;
    }

    execute(){
        var he1 = this.edge.he1;
        var he2 = this.edge.he2;

        if (he1.vtx !== this.vtx) {
            let temp = he1;
            he1 = he2;
            he2 = temp;
        }

        this.executeLowLevel(he1, he2);
    }

    unexecute(){
        var MEV = new mev(this.edge, this.vtx);
        MEV.build_c(this.v_begin, this.v_next1, this.v_next2, this.face1, this.face2);
        MEV.execute();
    }

    executeLowLevel(p_he1, p_he2){
        var he = he2.nxt;
        while (he !== p_he1) {
            this.halfEdgeSetVtx(he, p_he2.vtx);
            he = he.mate().nxt;
        }

        this.vertexSetHE(p_he2.vtx, p_he1.nxt);
        this.loopSetHe(p_he1.loop, this.halfEdgeDeleteHe(p_he1));
        this.loopSetHe(p_he2.loop, this.halfEdgeDeleteHe(p_he2));

        this.edgeSetHe1(this.edge, null);
        this.edgeSetHe2(this.edge, null);
        this.vertexSetHE(this.vtx, null);

        if (p_he1.prv.nxt !== p_he1) {
           p_he1 = null;
        }
        if (p_he2.prv.nxt !== p_he2) {
            p_he2 = null;
        }
    }
}