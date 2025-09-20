const { body, validationResult } = require('express-validator')
const petValidationRules = () => {
  return [
    // name must be alphabetic.
    body('name').trim().notEmpty().isAlpha().isLength({ min: 3}),
    // age most be an integer
    body('age').trim().notEmpty().isFloat( {min: 0.1} ),
    // sex must be male or female.
    body('sex').trim().toLowerCase().notEmpty().isAlpha().isIn( ['male', 'female'] ),
    // vaccines can be updated or not updated.
    body('vaccines').toLowerCase().notEmpty().isAlpha().isIn(['updated', 'not updated']),
    // hair color must be alphabetic, must have at least three characters.
    body('hairColor').trim().notEmpty().isAlpha().isLength( { min: 3} ),
    // weight must be a float and has a value of at least 0.1.
    body('weight').trim().notEmpty().isFloat( { min: 0.1} ),
    // RoutineControll must be updated or not updated.
    body('routineControll').toLowerCase().notEmpty().isAlpha().isIn(['updated', 'not updated'])

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  petValidationRules,
  validate,
}