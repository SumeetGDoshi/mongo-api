const productmodelObj = require('../models/products');
const categoryserviceObj = require('../services/categoryservice');

module.exports.getAllDetails = async function (data) {
    var page = data.page || 1;
    var limit = data.limit || 20;
    let finalResult = [];
    let resultSet;
    let result3;
    let count;
    let countValue;
    let i;
    if(data.CategoryId){
        let CategoryDetails = await categoryserviceObj.categoryMappingDetails(data);
        if (CategoryDetails.length != "") {
            resultSet = await productmodelObj.find({ categoryId: { "$in": CategoryDetails } }, {
                "id": 1,
                "categoryId": 1,
                "title": 1,
                "prices.skuImage": 1,
                "reviews.ratings": 1,
                "productImages": 1,
                "prices": 1,
                "trade": 1,
                "attributes": 1
            }).skip(parseInt(limit) * (parseInt(page) - 1)).limit(parseInt(limit));

            
    
        } else {
            resultSet = await productmodelObj.find({ categoryId: { "$in": data.CategoryId } }, {
                "id": 1,
                "categoryId": 1,
                "title": 1,
                "prices.skuImage": 1,
                "reviews.ratings": 1,
                "productImages": 1,
                "prices": 1,
                "trade": 1,
                "attributes": 1
            }).skip(parseInt(limit) * (parseInt(page) - 1)).limit(parseInt(limit));

         
        }

    }else{
        resultSet = await productmodelObj.find({}, {
            "id": 1,
            "categoryId": 1,
            "title": 1,
            "prices.skuImage": 1,
            "reviews.ratings": 1,
            "productImages": 1,
            "prices": 1,
            "trade": 1,
            "attributes": 1
        }).skip(parseInt(limit) * (parseInt(page) - 1)).limit(parseInt(limit));
    
        countValue = await productmodelObj.count();
    
    }

    for (i = 0; i < resultSet.length; i++) {
        const element = resultSet[i];
        let resultData = element.prices;

        for (let j = 0; j < resultData.length; j++) {
            const priceData = resultData[j];
            let percentOriginalPrice = await parseFloat(priceData.originalPrice.value) * 0.75
            let percentDiscountedPrice = await parseFloat(priceData.discountedPrice.value) * 0.75
            let originalPrice = await percentOriginalPrice + parseFloat(priceData.originalPrice.value)
            let discountedPrice = await percentDiscountedPrice + parseFloat(priceData.discountedPrice.value)
            resultSet[i].prices[j].originalPrice.value = await originalPrice.toFixed(2)
            resultSet[i].prices[j].discountedPrice.value = await discountedPrice.toFixed(2)

            if (finalResult.indexOf(resultSet[i]) === -1) finalResult.push(resultSet[i]);
        }
    }
    return await {resultSet ,countValue};
}

module.exports.getproductData = async function (data) {
    let finalResult = [];
    let i;
    let resultSet = await productmodelObj.find({ id: data.ProductId }, {
        "productImages": 1,
        "id": 1,
        "categoryId": 1,
        "title": 1,
        "sellerId": 1,
        "status": 1,
        "seller": 1,
        "prices.originalPrice": 1,
        "prices.discountedPrice": 1,
        "attributes": 1
    })

    for (i = 0; i < resultSet.length; i++) {
        const element = resultSet[i];
        let resultData = element.prices;


        for (let j = 0; j < resultData.length; j++) {
            const priceData = resultData[j];
            let percentOriginalPrice = await parseFloat(priceData.originalPrice.value) * 0.75
            let percentDiscountedPrice = await parseFloat(priceData.discountedPrice.value) * 0.75
            let originalPrice = await percentOriginalPrice + parseFloat(priceData.originalPrice.value)
            let discountedPrice = await percentDiscountedPrice + parseFloat(priceData.discountedPrice.value)
            resultSet[i].prices[j].originalPrice.value = await originalPrice.toFixed(2)
            resultSet[i].prices[j].discountedPrice.value = await discountedPrice.toFixed(2)

            if (finalResult.indexOf(resultSet[i]) === -1) finalResult.push(resultSet[i]);
        }
    }
    return await finalResult;

}

module.exports.getProductSearch = async function (data) {
    var page = data.page || 1;
    var limit = data.limit || 20;
    let resultSet;
    let finalResult=[];
    if (data.ProductSearch.length >= 3) {
         resultSet = await productmodelObj.find({ title: { $regex: data.ProductSearch, $options: '$i' } },{
            "id": 1,
            "categoryId": 1,
            "title": 1,
            "prices.skuImage": 1,
            "reviews.ratings": 1,
            "productImages": 1,
            "prices": 1,
            "trade": 1
        }).skip(parseInt(limit) * (parseInt(page) - 1)).limit(parseInt(limit));
        
        for (i = 0; i < resultSet.length; i++) {
            const element = resultSet[i];
            let resultData = element.prices;
    
    
            for (let j = 0; j < resultData.length; j++) {
                const priceData = resultData[j];
                let percentOriginalPrice = await parseFloat(priceData.originalPrice.value) * 0.75
                let percentDiscountedPrice = await parseFloat(priceData.discountedPrice.value) * 0.75
                let originalPrice = await percentOriginalPrice + parseFloat(priceData.originalPrice.value)
                let discountedPrice = await percentDiscountedPrice + parseFloat(priceData.discountedPrice.value)
                resultSet[i].prices[j].originalPrice.value = await originalPrice.toFixed(2)
                resultSet[i].prices[j].discountedPrice.value = await discountedPrice.toFixed(2)
    
                if (finalResult.indexOf(resultSet[i]) === -1) finalResult.push(resultSet[i]);
            }
        }
        
        return await {"resultSet":resultSet};
    }
}