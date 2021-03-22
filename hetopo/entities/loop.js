module.exports = class loop{
    constructor(face){
        this.face = face;
        this.he = null;
        this.nxt = null;
        this.prv = null;

        var loopOfFace = this.face.loop;

        if (loopOfFace) {
            this.nxt = loopOfFace.nxt;
            this.prv = loopOfFace;
            loopOfFace.setNxt(this);
            if (this.nxt) {
                this.nxt.setPrv(this);
            }
        }
        else
        {
            this.face.setLoop(this);
        }
    }

    release(){
        if (this.prv) {
            this.prv.setNxt(this.nxt);
        }
        if (this.nxt) {
            this.nxt.setPrv(this.prv);
        }
        if (this.face) {
            if (this == this.face.loop) {
                this.face.setLoop(null);
            }
        }
    }

    setHe(he){
        this.he = he;
    }

    setPrv(loop){
        this.prv = loop;
    }

    setNxt(loop){
        this.nxt = loop;
    }

    setFace(face){
        this.face = face;
    }

}