const GalCommunityUser = require('../models/GalCommunityUser');
const CommunityUser = require('../models/CommunityUser');
const ChunkTemplate = require('./ChunkTemplate');

module.exports = class ChunkDataForCommunityUser extends ChunkTemplate {

    constructor() {
        super("snap_shot_community_user.txt");
    }

    //override
    async result(offset, limit) {
        return CommunityUser.findAll({ where: { IsActive: true }, offset, limit });
    }

    //override
    async formattedData(result) {

        let formatted = [];

        for (let model of result) {
            let galComUserIns = await GalCommunityUser.findOne({ where: { EmailAddress: model.EmailAddress } });
            if (galComUserIns) continue;

            formatted.push({
                "_id": model.Id,
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
                "Pager": "",
                "CommunityUserId": model.Id
            });

        }

        return formatted;
    }

}