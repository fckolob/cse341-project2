const router = require('express').Router();
const animalProductsController = require('../../controllers/animalProducts');
const { productValidationRules, validate } = require('../../validation/validationAnimalProduct');
const asyncHandler = require('../../utils/asyncHandler');

router.get('/', asyncHandler(animalProductsController.getAllProducts));
router.get('/:id', asyncHandler(animalProductsController.getSingleProduct));
router.post('/', productValidationRules(), validate, asyncHandler(animalProductsController.createProduct));
router.put('/:id', productValidationRules(), validate, asyncHandler(animalProductsController.updateProduct));
router.delete('/:id', asyncHandler(animalProductsController.deleteProduct));

module.exports = router;
