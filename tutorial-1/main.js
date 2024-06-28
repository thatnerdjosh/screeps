import { harvester } from '../shared/roles';

export function loop() {
    // For each creep
    Object.values(Game.creeps).forEach((creep) => {
        harvester.run(creep);
    });
}
