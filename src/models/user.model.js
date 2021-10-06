const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailValidator = require('../validators/emailValidator');
const isValidMobile = require('../validators/mobileValidator');

const schemaName = 'User';

const UserSchema = new mongoose.Schema(
  {
    is_active: { type: Boolean, default: true },
    first_name: {
      type: String,
      default: '',
      trim: true,
      // required: [false, 'Please provide a name.'],
      maxlength: [60, 'First Name cannot be more than 60 characters'],
    },
    last_name: {
      type: String,
      default: '',
      trim: true,
      // required: [false, 'Please provide a name.'],
      maxlength: [60, 'Last Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: email => {
          if (email === '') return true;
          return emailValidator(email.trim().toLowerCase())
        },
        message: 'Invalid email',
      },
    },
    primary_mobile: {
      type: Number,
      unique: true,
      required: [true, 'Please provide mobile number.'],
      validate: {
        validator: phone => isValidMobile(phone),
        message: 'Invalid mobile number',
      },
    },
    aa_handle: {
      type: String,
      unique: true,
      trim: true,
    },
    consent: {
      type: {},
      handle: {
        type: String,
        unique: true,
      },
      status: {
        type: String,
      },
    },
    session_id: {
      type: String,
      unique: true,
      trim: true,
    },
    fi_data: {
      type: {},
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ type: 1, createdAt: -1 });
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.models.User || mongoose.model(schemaName, UserSchema);
