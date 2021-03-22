const HeTool = require('../hetool/hetool')

module.exports = class prosec{
    constructor(socket){
        this.hetool = new HeTool();
        this.socket = socket;
    }
}