const express = require('express')
const router = express.Router()
const productController = require('../1.controllers/productController')
const categoryController = require('../1.controllers/categoryController')
const multer = require('../helpers/multer')

// PRODUCTS
router.post('/products', multer, productController.create)
router.post('/productscategory', multer, productController.createWithCategory)
router.get('/products', productController.getWithCategory)
router.patch('/products/:id', multer, productController.update)
router.patch('/productscategory/:id', multer, productController.updateWithCategory)
router.delete('/products/:id', multer, productController.remove)

// CATEGORIES
router.get('/categories', categoryController.index)

module.exports = router