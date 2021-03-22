const BuildingEntity = require("./buildingEntity");
const ifcOrganization = require("./ifcOrganization");
const ifcPerson = require("./ifcPerson");

module.exports = class ifcPersonAndOrganization extends BuildingEntity{
    constructor(){
        if(arguments.length > 0){
            super(arguments[0]);
        }
        else
        {
            super();
        }
        this.person = null;
        this.organization = null;
    }

    getStepLine(){
        var str = new String();
        str = str.concat(`#${this.entity_id} = IFCPERSONANDORGANIZATION(`);
        this.person ? str = str.concat(`#${this.person.entity_id}`) 
        : str = str.concat("$");
        str += ",";
        this.organization ? str = str.concat(`#${this.organization.entity_id}`) 
        : str = str.concat("$");
        str = str.concat(");\n");

        return str;
    }

}