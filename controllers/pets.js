const mongodb = require('../routes/datax/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const pets = await db.collection('pets').find().toArray();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
};

const getSinglePet = async (req, res) => {
  const _petId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb();
    const pet = await db.collection('pets').findOne({ _id: _petId });
    res.setHeader('Content-Type', 'application/json');
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pet' });
  }
};

const createPet = async (req, res) => {
  const pet = {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    hairColor: req.body.hairColor,
    weight: req.body.weight,
    vaccines: req.body.vaccines,
    routineControll: req.body.routineControll

  };
  const response = await mongodb.getDb().collection('pets').insertOne(pet);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while creating the pet');
  }
};

const updatePet = async (req, res) => {
  const _petId = new ObjectId(req.params.id);
  const pet = {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    hairColor: req.body.hairColor,
    weight: req.body.weight,
    vaccines: req.body.vaccines,
    routineControll: req.body.routineControll
  };
  const response = await mongodb
    .getDb()
    .collection('pets')
    .replaceOne({ _id: _petId }, pet);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the pet');
  }
};

const deletePet = async (req, res) => {
  const _petId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('pets').deleteOne({ _id: _petId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while deleting the pet');
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet
};
