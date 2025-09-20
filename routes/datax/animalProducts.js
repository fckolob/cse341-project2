const router = require('express').Router();
const animalProductsController = require('../../controllers/animalProducts');

const { productValidationRules, validate } = require('../../validation/validationAnimalProduct');

router.get('/', animalProductsController.getAllProducts);
router.get('/:id', animalProductsController.getSingleProduct);
router.post('/', productValidationRules(), validate, animalProductsController.createProduct);
router.put('/:id', productValidationRules(), validate, animalProductsController.updateProduct);
router.delete('/:id', animalProductsController.deleteProduct);

module.exports = router;
