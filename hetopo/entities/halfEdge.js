module.exports = class halfEdge{
    constructor(){
        this.prv = null;
        this.nxt = null;
        this.edge = null;
        this.vtx = null;
        this.loop = null;
    }

    static inBetween(p_v1, p_v2, p_face){
        var he = p_v1.he;
        var he_begin = he;
        do {

            if (he.mate().vtx === p_v2) {
                if (he.loop.face === p_face) {
                    return he;
                }
            }
            he = he.mate().nxt;
            
        } while (he !== he_begin);

        throw "halfEdge null reference returned by HalfEdge inBetween";

    }

    mate(){
        if (this.edge === null) {
            return this.nxt.prv;
        }
        if (this === this.edge.he1()) {
            return this.edge.he2();
        }
        else
        {
            return this.edge.he1();
        }
    }

    deleteHe(){
        if (this.edge === null) {
            return(null)
        }
        else if(this.nxt === this)
        {
            this.edge = null;
            return(this);
        }
        else
        {
            this.edge = null;
            this.prv.setNxt(this.nxt);
            this.nxt.setPrv(this.prv);
            return(this.prv);
        }
    }

    setPrv(he){
        this.prv = he;
    }

    setNxt(he){
        this.nxt = he;
    }

    setLoop(loop){
        this.loop = loop;
    }

    setEdge(edge){
        this.edge = edge;
    }

    setVtx(vtx){
        this.vtx = vtx;
    }
}