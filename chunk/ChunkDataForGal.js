const GalCommunityUser = require('../models/GalCommunityUser');
const CommunityUser = require('../models/CommunityUser');
const ChunkTemplate = require('./ChunkTemplate');

module.exports = class ChunkDataForGal extends ChunkTemplate {

    constructor() {
        super("snap_shot.txt");
    }

    //override
    async result(offset, limit) {
        return GalCommunityUser.findAll({ where: { IsActive: true }, offset, limit });
    }

    //override
    async formattedData(result) {

        let formatted = [];

        for (let i = 0; i < result.length; i++) {
            const model = result[i];

            let comUserIns = await CommunityUser.findOne({ where: { EmailAddress: model.EmailAddress } });
            model.CommunityUserId = comUserIns ? comUserIns.Id : null;

            formatted[i] = {
                "_id": model.ObjectGuid,
                "Id": model.Id,
                "Name": model.Name,
                "MiddleName": model.MiddleName,
                "LastName": model.LastName,
                "FullName": [model.Name, model.MiddleName, model.LastName].join(" "),
                "EmailAddress": model.EmailAddress,
                "CompanyId": model.CompanyId,
                "CompanyName": model.CompanyName,
                "Department": model.Department,
                "Title": model.Title,
                "PhotoUrl": model.PhotoUrl,
                "Phone": model.Phone,
                "Mobile": model.Mobile,
                "Pager": model.Pager,
                "CommunityUserId": model.CommunityUserId
            };

        }
        return formatted;
    }

};