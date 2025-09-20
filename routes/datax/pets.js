const router = require('express').Router();
const petsController = require('../../controllers/pets');
const { petValidationRules } = require('../../validation/validationPet');
const { userValidationRules, validate } = require('../validation/validationPet');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);
router.post('/', petValidationRules(), validate(), (req, res) => { petsController.createPet});
router.put('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;
