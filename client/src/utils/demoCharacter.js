export default class DemoCharacter {
    constructor(equipment = []) {
        this.characterName = "Demo Character";
        this.vigor = 0;
        this.mind = 0;
        this.endurance = 0;
        this.strength = 0;
        this.dexterity = 0;
        this.intelligence = 0;
        this.faith = 0;
        this.arcane = 0;
        this.equipment = equipment;
    }

    updateStat(statName, value) {
        if (this.hasOwnProperty(statName)) {
            this[statName] = value;
        }
    }

    addEquipment(item) {
        this.equipment.push(item);
    }

    removeEquipment(itemName) {
        this.equipment = this.equipment.filter(item => item.name !== itemName);
    }

    toJSON() {
        return {
            characterName: this.characterName,
            vigor: this.vigor,
            mind: this.mind,
            endurance: this.endurance,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            faith: this.faith,
            arcane: this.arcane,
            equipment: this.equipment
        };
    }

    getServerPayload() {
        return {
            characterName: this.characterName,
            vigor: this.vigor,
            mind: this.mind,
            endurance: this.endurance,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            faith: this.faith,
            arcane: this.arcane
        };
    }
}