import { catchAsync } from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { AppError } from '../utils/appError.js';
import Users from './../model/user.model.js';
export const isAuthenticated = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    // there is not token
    return next(new AppError('please login to your account', 401));
  }

  const verify = promisify(jwt.verify);
  const decoded = await verify(token, process.env.TOKEN_KEY);

  // is token expire?
  if (decoded.exp > Date.now()) {
    return next(new AppError('token expired', 401));
  }

  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('the user belonging to this token is not exist', 404)
    );
  }
  //if user changed password after token was issued
  // do something
  req.user = currentUser;
  next();
});
