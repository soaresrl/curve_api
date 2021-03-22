const model = require("../cmodel/model");

module.exports = class user {
    constructor(socket){
        this.socket = socket;
        this.model = new model();
        this.room = null;
        this.isAdmin = false;
    }
}