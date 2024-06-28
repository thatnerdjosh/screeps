import { harvester } from '../shared/roles';

export function loop() {
    // For each creep
    Object.values(Game.creeps).forEach((creep) => {
        if (creep.memory.role === undefined) {
            throw new Error("Creep " + creep.name + " role must be defined!");
        }

        switch (creep.memory.role) {
            case "harvester":
                harvester.run(creep);
        }
    });
}
