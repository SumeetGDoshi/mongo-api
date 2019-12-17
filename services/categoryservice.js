const categorymodelObj = require('../models/category');

module.exports.categoryListDetails = async function (data) {
    return await categorymodelObj.find({ "service_id": "1", "parent_id": data.CategoryId },{
        "provider_category_id":1,
        "category_name":1
    })
}

module.exports.categoryMappingDetails = async function (data) {
    let FinalArr = [];
    let result = await categorymodelObj.aggregate(
        [
            {
                "$graphLookup": {
                    "from": "category_masters",
                    "startWith": "$provider_category_id",
                    "connectFromField": "provider_category_id",
                    "connectToField": "parent_id",
                    "as": "ancestors"
                }
            },
            { "$match": { "parent_id": data.CategoryId, "service_id": "1" } },
            {
                "$addFields": {
                    "ancestors": {
                        "$reverseArray": {
                            "$map": {
                                "input": "$ancestors",
                                "as": "t",
                                "in": { "parent_id": "$$t.provider_category_id" }
                            }
                        }
                    }
                }
            }
        ]
    )


    for (let i = 0; i < result.length; i++) {
        const resData = result[i];
        let categoryDetails = resData.provider_category_id;
        FinalArr.push(categoryDetails)
    }

    return FinalArr;

}