const { body, validationResult } = require('express-validator')
const petValidationRules = () => {
  return [
    // name must be alphabetic.
    body('name').trim(' ').notEmpty().isAlpha().isLength({ min: 3}).withMessage('name must be alphabetic.'),
    // age most be a float.
    body('age').trim(' ').notEmpty().isFloat( {min: 0.1} ).withMessage('age most be a float.'),
    // sex must be male or female.
    body('sex').trim(' ').toLowerCase().notEmpty().isAlpha().isIn( ['male', 'female'] ).withMessage('sex must be male or female.'),
    // vaccines can be updated or not updated.
    body('vaccines').toLowerCase().notEmpty().isIn(['updated', 'not updated']).withMessage('vaccines can be updated or not updated.'),
    // hair color must be alphabetic, must have at least three characters.
    body('hairColor').trim(' ').notEmpty().isAlpha().isLength( { min: 3} ).withMessage('hair color must be alphabetic, must have at least three characters.'),
    // weight must be a float and has a value of at least 0.1.
    body('weight').trim(' ').notEmpty().isFloat( { min: 0.1} ).withMessage('weight must be a float and has a value of at least 0.1.'),
    // RoutineControll must be updated or not updated.
    body('routineControll').toLowerCase().notEmpty().isIn(['updated', 'not updated']).withMessage('RoutineControll must be updated or not updated.')

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