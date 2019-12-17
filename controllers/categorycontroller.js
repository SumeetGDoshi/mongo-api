const categoryserviceObj = require('../services/categoryservice');

module.exports.categoryListDetails = async function (req, res) {
    try {
        let result = await categoryserviceObj.categoryListDetails(req.query);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}
