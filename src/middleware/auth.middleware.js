const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');

dotenv.config();

const auth = (admin_only = false) =>
  async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const bearer = 'Bearer ';

    if (!authHeader || !authHeader.startsWith(bearer)) {
      throw new HttpException(401, 'Access denied. No credentials sent!');
    }

    const token = authHeader.replace(bearer, '');
    const secretKey = process.env.SECRET_JWT || '';

    // Verify Token
    const decoded = jwt.verify(token, secretKey);
    const user = await UserModel.findOne({ id: decoded.user_id });

    if (!user) {
      throw new HttpException(401, 'Authentication failed!');
    }

    // checks if the current user is the admin
    const isAdmin = user.is_admin === 1;

    // if the current user is not the admin and
    // then he don't have the permission to do this action.
    // and the user will get this error
    if (admin_only && !isAdmin) {
      throw new HttpException(401, 'Unauthorized');
    }

    // if the user has permissions
    req.currentUser = user;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports = auth;
