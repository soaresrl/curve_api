module.exports = class edge {
    constructor(){
        this.he1 = null;
        this.he2 = null;
    }

    incidentFaces(){
        var incFaces = new Set();
        incFaces.add(this.he1.loop.face);
        incFaces.add(this.he2.loop.face);
        return incFaces;
    }

    adjacentFaces(){
        var adjEgdes = new Set();
        var he1 = this.he1;
        var he2 = this.he2;

        var he = he1.nxt;

        if (he !== he1) {
            while (he !== he2) {
                adjEgdes.add(he.edge);
                he = he.mate().nxt;
            }
        }

        var he = he2.nxt;

        if (he !== he2) {
            while (he !== he1) {
                adjEgdes.add(he.edge);
                he = he.mate().nxt;
            }
        }

        return adjEgdes;
    }

    incidentVertices(){
        var incVert = new Set();
        incVert.add(this.he1.vtx);
        incVert.add(this.he2.vtx);
        return incVert;
    }

    v1(){
        return this.he1.vtx;
    }

    v2(){
        return this.he2.vtx;
    }

    setHe1(he1){
        this.he1 = he1;
    }

    setHe2(he2){
        this.he2 = he2;
    }
}