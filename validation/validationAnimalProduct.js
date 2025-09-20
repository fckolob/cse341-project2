const { body, validationResult } = require('express-validator')
const productValidationRules = () => {
  return [
    // name must be alphanumeric, must have at least three characters
    body('name').trim().notEmpty().matches(/^[\w\s.,'-]+$/).isLength({ min: 3}),
    // brand must be alphanumeric, must have at least three characters
    body('brand').trim().notEmpty().matches(/^[\w\s.,'-]+$/).isLength( { min: 3 } ),
    // description must be alphanumeric, must have at least three characters
    body('description').trim().notEmpty().matches(/^[\w\s.,'-]+$/).isLength( { min: 3 } ),
    // price must be a float and be at least 0.1
    body('price').notEmpty().isFloat( { min: 0.1} ),
    // color must be alphabetic, must have at least three characters.
    body('color').trim().notEmpty().matches(/^[\w\s.,'-]+$/).isLength( { min: 3} ),
    // inStock can be yes or no
    body('inStock').trim().notEmpty().toLowerCase().isIn( [ 'yes', 'no'] ),
    // size can be small, medium, large, extralarge or unique
    body('size').toLowerCase().notEmpty().trim().isIn(['small', 'medium', 'large', 'extralarge', 'unique'])

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
  productValidationRules,
  validate,
}