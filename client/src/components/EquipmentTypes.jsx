import React from "react";

const EquipmentList = [
    "Dagger",
    "Straight Sword",
    "Greatsword",
    "Colossal Sword",
    "Thrusting Sword",
    "Heavy Thrusting Sword",
    "Curved Sword",
    "Curved Greatsword",
    "Katana",
    "Twinblade",
    "Axe",
    "Greataxe",
    "Hammer",
    "Flail",
    "Great Hammer",
    "Colossal Weapon",
    "Spear",
    "Great Spear",
    "Halberd",
    "Reaper",
    "Whip",
    "Fist",
    "Claw",
    "Light Bow",
    "Bow",
    "Greatbow",
    "Crossbow",
    "Ballista",
    "Glintstone Staff",
    "Sacred Seal",
    "Torch",
    "Tool",
    "Thrusting Shield",
    "Hand-to-Hand Art",
    "Throwing Blade",
    "Backhand Blade",
    "Perfume Bottle",
    "Beast Claw",
    "Light Greatsword",
    "Great Katana",
    "Sorcery",
    "Incantation",
    "Talisman"
]

const EquipmentTypes = () => {
    return (
        <>
            <option value=''>Select Equipment Type</option>
            {EquipmentList.map((type) => (
                <option value={type}>{type}</option>
            ))}
        </>
    )
}

export default EquipmentTypes;