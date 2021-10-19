const ChunkDataForCommunityUser = require('./ChunkDataForCommunityUser');
const ChunkDataForGal = require('./ChunkDataForGal');

module.exports.chunkDataForGal = async () => {
    const chn = new ChunkDataForGal();
    chn.run(0, 100);
};

module.exports.chunkDataForCommunityUser = async () => {
    const chn = new ChunkDataForCommunityUser();
    return await chn.run(0, 100);
};