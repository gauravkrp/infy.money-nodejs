const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

const UserModel = require('../models/user.model');
const HttpException = require('../utils/httpException');

dotenv.config();

const secretKey = process.env.SECRET_JWT || "";

/******************************************************************************
 *                              User Controller
 ******************************************************************************/

class UserController {
  
  getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id).exec();
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  };

  getUserByMobile = async (req, res, next) => {
    const { mobile } = req.params;
    try {
      const user = await UserModel.findOne({ primary_mobile: mobile }).exec();
      if (!user) res.status(400).json({ success: false, message: `No user found with mobile number ${mobile}` });
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  };

  getUserProfileByMobile = async (req, res, next) => {
    const { mobile } = req.params;
    try {
      const user = await UserModel.findOne({ primary_mobile: mobile }, { fi_data: 0 }).exec();
      if (!user) res.status(400).json({ success: false, message: `No user found with mobile number ${mobile}` });
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  };

  getUserFiData = async (req, res) => {
    const { mobile, FI_TYPE } = req.params;
    console.log(req.params, `fi_data.${FI_TYPE}`);
    try {
      const user = await UserModel.findOne({ primary_mobile: mobile }, `fi_data.${FI_TYPE}`).exec();
      if (!user) res.status(400).json({ success: false, message: `No data found with mobile number ${mobile}` });
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  }

  getUserFiDataSummary = async (req, res) => {
    const { mobile } = req.params;
    try {
      const user = await UserModel.findOne({ primary_mobile: mobile }, { "transactions": 0 }).exec();
      if (!user) res.status(400).json({ success: false, message: `No data found with mobile number ${mobile}` });
      const { fi_data } = user;
      const data_types = Object.keys(fi_data);
      // console.log('data_types', data_types);
      data_types.forEach(type => {
        fi_data[type].forEach(item => {
          // console.log(type, item.type);
          delete item.transactions;
        });
      });
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  }

  createUser = async (req, res, next) => {
    this.checkValidation(req);

    // await this.hashPassword(req);

    const { body } = req;
    // const id = uuidv4()
    // body.uuid = id;

    try {
      const result = await UserModel.create(body);
      res.status(201).send({ status: true, message: 'User was created!', user: body });
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  };

  updateUser = async (req, res, next) => {
    this.checkValidation(req);
    const { body } = req;
    const { id } = req.params;

    // await this.hashPassword(req);
    // do the update query and get the result
    // it can be partial edit
    try {
      const user = await UserModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(400).json({ success: false })
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(400).send({ status: false, error });
    }
  };

  deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await UserModel.deleteOne({ _id: id });
      if (!deletedUser) {
        return res.status(400).json({ success: false })
      }
      res.status(200).json({ success: true, data: {} })
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error })
    }
  };


  checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation failed', errors);
    }
  }

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  }
}

module.exports = new UserController;
