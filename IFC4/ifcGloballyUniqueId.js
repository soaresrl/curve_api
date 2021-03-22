module.exports = class IfcGloballyUniqueId {
    constructor(value){
        this.value = value;
    }

    getStepParameters(is_select_type = false){
        
        var str = new String();

        if (is_select_type) {
            str = str.concat("IFCGLOBALLYUNIQUEID(");    
        }
        str = str.concat(`'${this.value}'`); //encode step string
        if (is_select_type) {
            str = str.concat(")");    
        }

        return str;
    }
}