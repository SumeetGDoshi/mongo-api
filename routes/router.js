const express = require('express')
const router = express.Router();

const productdetails = require('../controllers/productcontroller')
const categorydetails = require('../controllers/categorycontroller')


/**
 * @swagger
 * /shoclefmongo/getproductdetails:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *         type: string
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *         type: string
 *       - name: CategoryId  
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Product Details
 *         schema:
 *           $ref: '#/definitions/ProductDetails'
 * 
 */
 

router.get('/shoclefmongo/getproductdetails/',productdetails.getAllDetails); 

 /**
 * @swagger
 * /shoclefmongo/getproductdata:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductId
 *         description: Product Id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Registration Details
 * 
 */
 
router.get('/shoclefmongo/getproductdata/',productdetails.getproductData); 

 /**
 * @swagger
 * /shoclefmongo/getproductsearch:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: page
 *         in: query
 *         required: true
 *         type: string
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: true
 *         type: string
 *       - name: ProductSearch
 *         description: Product Search
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Product Search Details
 * 
 */
 
router.get('/shoclefmongo/getproductsearch/',productdetails.getProductSearch); 

/**
 * @swagger
 * /shoclefmongo/getcategorylist:
 *   get:
 *     tags:
 *       - Categorydetails
 *     description: Get Details of Category List
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CategoryId
 *         description: Category Id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Goods Category Details
 * 
 */


router.get('/shoclefmongo/getcategorylist', categorydetails.categoryListDetails)

module.exports = router;