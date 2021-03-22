const BuildingEntity = require("./buildingEntity");

module.exports = class ifcOwnerHistory extends BuildingEntity{
    constructor(){
        if(arguments.length > 0){
            super(arguments[0]);
        }
        else
        {
            super();
        }
        this.owning_user = null;
    }

    getStepLine(){
        var str = new String();
        str = str.concat(`#${this.entity_id} = IFCOWNERHISTORY(`);
        this.owning_user ? str = str.concat(`#${this.owning_user.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.owning_application ? str = str.concat(`#${this.owning_application.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.state ? str = str.concat(this.state.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.change_action ? str = str.concat(this.change_action.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.last_modified_date ? str = str.concat(this.state.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.last_modifying_user ? str = str.concat(`#${this.last_modifying_user.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.last_modifying_application ? str = str.concat(`#${this.last_modifying_application.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(",");
        this.creation_date ? str = str.concat(this.creation_date.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(");\n");

        return str;
    }

}