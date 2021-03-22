const ifcOrganization = require("./ifcOrganization");
const ifcOwnerHistory = require("./ifcOwnerHistory");
const ifcPerson = require("./ifcPerson");
const ifcPersonAndOrganization = require("./ifcPersonAndOrganization");
const ifcProject = require("./ifcProject")

module.exports = class buildingModel {
    constructor(){
        this.map_entities = new Map(/* int, buildingEntity */)
        console.log('building model created')
    }

    initIfcModel(){
        var project = new ifcProject(1);
        this.insertEntity(project);
        var person = new ifcPerson();
        this.insertEntity(person);
        var org = new ifcOrganization();
        this.insertEntity(org);
        var person_org = new ifcPersonAndOrganization();
        person_org.person = person;
        person_org.organization = org;
        this.insertEntity(person_org);
        var owner_history = new ifcOwnerHistory();
        owner_history.owning_user = person_org;
        this.insertEntity(owner_history);
    }

    insertEntity(e, overwrite_existing = false){
        var entity_id = e.entity_id;
        var it_has = this.map_entities.has(entity_id);
        if (it_has && overwrite_existing) {
            this.map_entities.set(entity_id, e);
        }
        else if(!it_has)
        {
            this.map_entities.set(entity_id, e);
        }
    }
}