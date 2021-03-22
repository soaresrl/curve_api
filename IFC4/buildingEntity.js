module.exports = class BuildingEntity {
    constructor(){
        if (arguments.length > 0) {
            this.entity_id = arguments[0];
        }
        else
        {
            this.entity_id = -1;
        }
    }
}