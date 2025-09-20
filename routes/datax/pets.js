const router = require('express').Router();
const petsController = require('../../controllers/pets');

const { petValidationRules, validate } = require('../../validation/validationPet');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);
router.post('/', petValidationRules(), validate, petsController.createPet);
router.put('/:id', petValidationRules(), validate, petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;
