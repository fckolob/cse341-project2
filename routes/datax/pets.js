const router = require('express').Router();
const petsController = require('../../controllers/pets');
const { isAuthenticated } = require("../../authentication/authentication");
const { petValidationRules, validate } = require('../../validation/validationPet');
const asyncHandler = require('../../utils/asyncHandler');



router.get('/', asyncHandler(petsController.getAllPets));
router.get('/:id', asyncHandler(petsController.getSinglePet));
router.post('/', isAuthenticated, petValidationRules(), validate, asyncHandler(petsController.createPet));
router.put('/:id', isAuthenticated, petValidationRules(), validate, asyncHandler(petsController.updatePet));
router.delete('/:id', isAuthenticated, asyncHandler(petsController.deletePet));

module.exports = router;
