const ifcContext = require("./ifcContext");

module.exports = class ifcProject extends ifcContext{
    constructor(){
        if (arguments.length) {
            super(arguments[0]);
        }
        else
        {
            super();
        }
    }

    getStepLine(){
        var str = new String();
        str = str.concat(`#${this.entity_id} = IFCPROJECT(`);
        this.global_id ? str = str.concat(this.global_id.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.owner_history ? str = str.concat(`#${this.owner_history.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.name ? str = str.concat(this.name.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.description ? str = str.concat(`#${this.description.getStepParameter()}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.object_type ? str = str.concat(`#${this.object_type.getStepParameter()}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.long_name ? str = str.concat(`#${this.long_name.getStepParameter()}`) 
        : str = str.concat("$");
        str = str.concat(",");
        str = str.concat("$"); //writeEntityList
        str = str.concat(",");
        this.units_in_context ? str = str.concat(`#${this.units_in_context.getStepParameter()}`) 
        : str = str.concat("$");
        str = str.concat(");\n");

        return str;
    }
}