const LinkedList = require('../../utils/linkedList/linkedList')

module.exports = class face {
    constructor(){
        this.loop = null;
    }

    internalFaces(){
        var intFaces = new LinkedList();
        var loop = this.loop;

        while (loop === loop.nxt) {
            var loop_in_faces = new Set();
            var transverse = new LinkedList();

            var f = loop.he.mate().loop.face;
            if (f === this) {
                continue;
            }

            loop_in_faces.add(f);
            transverse.add(f);
            while (!transverse.isEmpty()) {
                f = transverse.removeFrom(0);
                var he = f.loop.he;
                var he_begin = he;
                do {
                    let adj = he.mate().loop.face;
                    if (adj !== this) {

                        if (!loop_in_faces.has(adj)) {
                            loop_in_faces.add(adj);
                            transverse.add(adj);
                        }
                    }
                    he = he.nxt;
                } while (he !== he_begin);
            }

            intFaces.add(loop_in_faces);
        }
        return intFaces;
    }

    adjacentFaces(){
        var adjFaces = new Set();
        var loop = this.loop;

        if (loop.he !== null) {
            var he = loop.he;
            var he_begin = he;

            do {
                if (he.mate().loop.face !== this) {
                    adjFaces.add(he.mate().loop.face)
                }
                he = he.nxt;
            } while (he != he_begin);           
        }
        return adjFaces;
    }

    incidentVertices(){
        var adjVertexes = new Set();
        var he = this.loop.he;
        var he_begin = he;

        do {
            adjVertexes.add(he.vtx);
            he = he.nxt;
        } while (he != he_begin);

        return adjVertexes;
    }

    setLoop(loop){
        this.loop = loop;
    }
}