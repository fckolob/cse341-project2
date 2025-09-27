const router = require('express').Router();
const animalProductsController = require('../../controllers/animalProducts');
const { isAuthenticated } = require("../../authentication/authentication");
const { productValidationRules, validate } = require('../../validation/validationAnimalProduct');
const asyncHandler = require('../../utils/asyncHandler');

router.get('/', asyncHandler(animalProductsController.getAllProducts));
router.get('/:id', asyncHandler(animalProductsController.getSingleProduct));
router.post('/', isAuthenticated, productValidationRules(), validate, asyncHandler(animalProductsController.createProduct));
router.put('/:id', isAuthenticated, productValidationRules(), validate, asyncHandler(animalProductsController.updateProduct));
router.delete('/:id', isAuthenticated, asyncHandler(animalProductsController.deleteProduct));

module.exports = router;
