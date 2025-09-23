const router = require('express').Router();
const petsController = require('../../controllers/pets');
const { petValidationRules, validate } = require('../../validation/validationPet');
const asyncHandler = require('../../utils/asyncHandler');

router.get('/', asyncHandler(petsController.getAllPets));
router.get('/:id', asyncHandler(petsController.getSinglePet));
router.post('/', petValidationRules(), validate, asyncHandler(petsController.createPet));
router.put('/:id', petValidationRules(), validate, asyncHandler(petsController.updatePet));
router.delete('/:id', asyncHandler(petsController.deletePet));

module.exports = router;
