const ifcRoot = require("./ifcRoot");

module.exports = class ifcObjectDefition extends ifcRoot{
    constructor(){
        if (arguments.length > 0) {
            super(arguments[0]);
        }
        else
        {
            super();
        }
    }
}