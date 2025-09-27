const router = require('express').Router();

const passport = require('passport');



router.use('/pets', require('./datax/pets'));

router.use('/products', require('./datax/animalProducts'))

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
