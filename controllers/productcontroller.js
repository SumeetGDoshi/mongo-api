const productserviceObj = require('../services/productservice');

module.exports.getAllDetails = async function (req, res) {
    try {
        let result = await productserviceObj.getAllDetails(req.query)
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        return res.status(400).json({ 'err' : e});
    }
}

module.exports.getproductData = async function (req, res) {
    try {
        let result = await productserviceObj.getproductData(req.query)
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        return res.status(400).json({ 'err' : e});
    }
}

module.exports.getProductSearch = async function (req, res) {
    try {
        let result = await productserviceObj.getProductSearch(req.query)
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        return res.status(400).json({ 'err' : e});
    }
}