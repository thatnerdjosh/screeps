export var harvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Find sources that still have energy.
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)

        // If capacity available
        if (creep.store.getFreeCapacity() > 0) {
            // Harvest
            let harvestResult = creep.harvest(sources[0]);

            // If not in range
            if (harvestResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else { // Full
            // Transfer
            let transferResult = creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);

            // If not in range
            if (transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns["Spawn1"]);
            }
        }
	}
};
