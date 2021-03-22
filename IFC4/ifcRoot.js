const BuildingEntity = require("./buildingEntity");

module.exports = class ifcRoot extends BuildingEntity{
    constructor(){
        if (arguments.length > 0) {
            super(arguments[0]);
        }
        else
        {
            super();
        }
    }

    getStepLine(){
        
        console.log('cheguei no root')
        var str = new String();
        str = str.concat(`#${this.entity_id} IFCROOT(`);
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
        str = str.concat(");\n");
        
        return str;
    }
}