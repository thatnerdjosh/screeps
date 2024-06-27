let harvester = require('role.harvester');

module.exports.loop = function () {
    // For each creep
    Object.values(Game.creeps).forEach((creep) => {
        harvester.run(creep);
    });
}