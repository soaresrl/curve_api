const LinkedList = require('../utils/linkedList/linkedList')

module.exports = class hemodel{
    constructor(){
        this.points = new Set();
        this.curves = new Set();
        this.surfaces = new Set();
        this.selectedPoints = new Set();
        this.selectedCurves = new Set();
        this.selectedSurfaces = new Set();
    }

    insertPoint(pt){
        this.points.add(pt);
    }

    insertCurve(crv){
        this.curves.add(curve);
    }

    setInfinitySurface(sfc){
        this.infty_face = sfc;
    }

    insertSurface(sfc){
        this.surfaces.add(sfc);
    }

    removePoint(pt){
        if (this.points.has(pt)) {
            this.points.delete(pt);
        }
    }

    removeCurve(crv){
        if (this.curves.has(crv)) {
            this.curves.delete(crv);
        }
    }

    removeSurface(sfc){
        if (this.surfaces.has(sfc)) {
            this.surfaces.delete(sfc);
        }
    }

    numberOfPoints(){
        return this.points.size;
    }

    numberOfCurves(){
        return this.curves.size;
    }

    numberOfSurfaces(){
        return this.surfaces.size;
    }
}