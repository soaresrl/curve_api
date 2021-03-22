const BuildingEntity = require("./buildingEntity");

module.exports = class ifcOrganization extends BuildingEntity{
     constructor(){
        if(arguments.length > 0){
            super(arguments[0]);
        }
        else
        {
            super();
        }
     }

     getStepLine(){
        var str = new String();
        str = str.concat(`#${this.entity_id} = IFCORGANIZATION(`);
        this.identification ? str = str.concat(`#${this.identification.entity_id}`) 
        : str = str.concat("$");
        str += ",";
        this.name ? str = str.concat(this.name.getStepParameter()) 
        : str = str.concat("$");
        this.description ? str = str.concat(this.description.getStepParameter()) 
        : str = str.concat("$");
        str += ",";
        str += "$"; //write entity list roles
        str += ","; 
        str += "$"; //write entity list addresses
        str = str.concat(");\n");

        return str;
     }
}