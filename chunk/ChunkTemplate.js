const memory = require("../memory");
const axios = require('axios').default;
const { micro_service_url } = require("../config");

module.exports = class ChunkTemplate {

    constructor(file) {
        this.memento = memory(file);
    }

    async run(offset, limit) {
        const data = this.memento.restore(offset, limit);
        offset = data.offset;
        limit = data.limit;
        console.log(limit, offset);

        let result = await this.result(offset, limit);
        if (result.length == 0) return 1;
        this.memento.takeSnapShot({ offset, limit });
        const formatted = await this.formattedData(result);
        const microserviceResult = await axios.post(micro_service_url, formatted);
        console.log({ took: microserviceResult.data.took, errors: microserviceResult.data.errors, first: formatted[0].Id });
        this.memento.flush();
        await this.run(offset + limit, limit);
    }

    //override
    async result(offset, limit) {
        return [];
    }

    //override
    async formattedData(data) {
        return [];
    }

};