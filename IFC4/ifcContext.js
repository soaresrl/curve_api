const ifcObjectDefition = require("./ifcObjectDefinition");

module.exports = class ifcContext extends ifcObjectDefition{
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