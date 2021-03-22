module.exports = class vertex {
    constructor(){
        this.he = null;
    }

    incidentFaces(){
        var adjFaces = new Set();
        var he = this.he;
        var he_begin = he;
        do {
            adjFaces.add(he.loop.face);
            he = he.mate().nxt;
        } while (he !== he_begin);

        return adjFaces;
    }

    incidentEdges(){
        var adjEdges = new Set();
        var he = this.he;
        var he_begin = he;

        if (he.edge === null) {
            return adjEdges;
        }

        do {
            adjEdges.add(he.edge);
            he = he.mate().nxt;
        } while (he !== he_begin);

        return adjFaces;
    }

    adjacentVertices(){
        var adjVertexes = new Set();
        var he = this.he;
        var he_begin = he;

        do {
            he = he.mate();
            if (he.mate().vtx !== this) {
                adjVertexes.add(he.vtx);
            }
            he = he.nxt;
        } while (he !== he_begin);

        return adjVertexes;
    }

    setHe(he){
        this.he = he;
    }
}