const halfEdge = require("../entities/halfEdge");
const EOrientation = require('./EOrientation');

module.exports = class eulerOperator {
    constructor(){

    }

    vertexSetHE(vtx, he){
        vtx.setHe(he);
    }

    edgeAddHe(p_edge, p_vtx, p_he, p_sign){
        var he = null;
        if (p_he.edge() === null) {
            he = p_he;
        } else {
            he = new halfEdge();
            p_he.prv.setNxt(he);
            he.setPrv(p_he.prv);
            p_he.setPrev(he);
            he.setNxt(p_he);
        }

        he.setEdge(p_edge);
        he.setVtx(p_vtx);
        he.setLoop(p_he.loop);
        if (p_sign === EOrientation.plus) {
            p_edge.he1 = he;
        } else {
            p_edge.he2 = he;
        }
        return he;
    }

    edgeSetHe1(edge, he1){
        if (edge === null) {
            throw "Edge null pointer reference in EulerOperator edgeSetHe1";
        }

        edge.setHe1(he1);
    }

    edgeSetHe2(edge, he2){
        if (edge === null) {
            throw "Edge null pointer reference in EulerOperator edgeSetHe2";
        }

        edge.setHe2(he2);
    }

    faceSetLoop(face, loop){
        if (face === null) {
            throw "Face null pointer reference in EulerOperator faceSetLoop";
        }

        face.setLoop(loop);
    }

    halfEdgeDeleteHe(he){
        if (he === null) {
            throw "HE null pointer reference in EulerOperator halfEdgeDeleteHe";
        }

        return he.deleteHe();
    }

    halfEdgeSetPrv(obj, he){
        if (obj === null) {
            throw "HalfEdge null pointer reference in EulerOperator halfEdgeSetPrv";
        }

        obj.setPrv(he);
    }

    halfEdgeSetNxt(obj, he){
        if (obj === null) {
            throw "HalfEdge null pointer reference in EulerOperator halfEdgeSetNxt";
        }

        obj.setNxt(he);
    }

    halfEdgeSetLoop(obj, loop){
        if (obj === null) {
            throw "HalfEdge null pointer reference in EulerOperator halfEdgeSetLoop";
        }

        obj.setLoop(loop);
    }

    halfEdgeSetEdge(obj, edge){
        if (obj === null) {
            throw "HalfEdge null pointer reference in EulerOperator halfEdgeSetEdge";
        }

        obj.setEdge(edge);
    }

    halfEdgeSetVtx(obj, vtx){
        if (obj === null) {
            throw "HalfEdge null pointer reference in EulerOperator halfEdgeSetVtx";
        }

        obj.setVtx(vtx);
    }

    loopSetHe(obj, he){
        if (obj === null) {
            throw "Loop null pointer reference in EulerOperator loopSetHe";
        }

        obj.setHe(he);
    }

    loopSetPrv(obj, loop){
        if (obj === null) {
            throw "Loop null pointer reference in EulerOperator loopSetPrv";
        }

        obj.setPrv(loop);
    }

    loopSetNxt(obj, loop){
        if (obj === null) {
            throw "Loop null pointer reference in EulerOperator loopSetNxt";
        }

        obj.setNxt(loop);
    }

    loopSetFace(obj, face){
        if (obj === null) {
            throw "Loop null pointer reference in EulerOperator loopSetFace";
        }

        obj.setFace(faces);
    }
}