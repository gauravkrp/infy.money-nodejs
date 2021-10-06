const { body } = require('express-validator');

exports.createUserSchema = [
  body('name')
    .exists()
    .withMessage('Name is required')
    // .isAlpha() Commented as name can have space in our testing purpose
    // .withMessage('Must be only alphabetical chars')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .isLength({ max: 10 })
    .withMessage('Password can contain max 10 characters'),
  body('review').optional().isLength({ min: 10 }).withMessage('Must be at least 10 chars long'),
  body('is_admin').optional().isBoolean().withMessage('Must be true or false'),
  body('created_on').exists(),
  body('review_created_on').optional(),
  body('review_updated_on').optional(),
];

exports.updateUserSchema = [
  body('name')
    .optional()
    .isAlpha()
    .withMessage('Must be only alphabetical chars')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars long'),
  body('email').optional().isEmail().withMessage('Must be a valid email').normalizeEmail(),
  body('password')
    .optional()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .isLength({ max: 10 })
    .withMessage('Password can contain max 10 characters')
    .custom((value, { req }) => !!req.body.confirm_password)
    .withMessage('Please confirm your password'),
  body('is_admin').optional().isBoolean().withMessage('Must be true or false'),
  body('review_created_on').optional(),
  body('review_updated_on').optional(),
  body()
    .custom(value => !!Object.keys(value).length)
    .withMessage('Please provide required field to update')
    .custom(value => {
      const updates = Object.keys(value);
      const allowUpdates = [
        'name',
        'password',
        'email',
        'review',
        'review_created_on',
        'review_updated_on',
      ];
      return updates.every(update => allowUpdates.includes(update));
    })
    .withMessage('Invalid updates!'),
];

exports.validateLogin = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password must be filled'),
];
