const router = require('express').Router();
const petsController = require('../../controllers/pets');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);
router.post('/', petsController.createPet);
router.put('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;
