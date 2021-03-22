const BuildingEntity = require("./buildingEntity");

module.exports = class ifcPerson extends BuildingEntity{
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
        str = str.concat(`#${this.entity_id} = IFCPERSON(`);
        this.identification ? str = str.concat(this.identification.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.family_name ? str = str.concat(this.family_name.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        this.given_name ? str = str.concat(this.given_name.getStepParameter()) 
        : str = str.concat("$");
        str = str.concat(",");
        if (this.middle_names /*.length > 0*/) {
            str += '(';

            for (let i = 0; i < this.middle_names.length; i++) {
                if (middle_names[i]) {
                    str += middle_names[i].getStepParameter();
                }
                else
                {
                    str += '$';
                }
                if (i < this.middle_names.length-1) {
                    str += ",";
                }
            }
            str += ')';
        }
        str = str.concat(",");
        if (this.prefix_titles/*.length > 0*/) {
            str += '(';

            for (let i = 0; i < this.prefix_titles.length; i++) {
                if (prefix_titles[i]) {
                    str += prefix_titles[i].getStepParameter();
                }
                else
                {
                    str += '$';
                }
                if (i < this.prefix_titles.length-1) {
                    str += ",";
                }
            }
            str += ')';
        }
        else
        {
            str += '$';
        }
        str = str.concat(",");
        if (this.sufix_titles/*.length > 0*/) {
            str += '(';

            for (let i = 0; i < this.sufix_titles.length; i++) {
                if (sufix_titles[i]) {
                    str += sufix_titles[i].getStepParameter();
                }
                else
                {
                    str += '$';
                }
                if (i < this.sufix_titles.length-1) {
                    str += ",";
                }
            }
            str += ')';
        }
        else
        {
            str += '$';
        }
        str += ",";
        str += "$"; //write entity list roles
        str += ",";
        str += "$"; //write entity list address
        str = str.concat(");\n");

        return str;
    }
}