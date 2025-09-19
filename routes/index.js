const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/pets', require('./datax/pets'));

module.exports = router;
