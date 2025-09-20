const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/pets', require('./datax/pets'));

router.use('/products', require('./datax/animalProducts'))

module.exports = router;
