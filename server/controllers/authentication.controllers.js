import Users from '../model/user.model.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';

function createAndSendToken(user, res) {
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: '1d',
  });
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  });
  user.password = undefined;
  res.status(200).json({ data: { user, token } });
}

export const signUp = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);
  if (!user) {
    return next(new AppError('sign up failed', 400));
  }
  createAndSendToken(user, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { field, password } = req.body;
  const user = await Users.findOne({
    $or: [{ username: field }, { phoneNumber: field }],
  }).select('+password');
  if (!user) {
    return next(new AppError('user not found', 404));
  }
  if (!(await user.comparePassword(password))) {
    return next(new AppError('incurrect password', 401));
  }
  createAndSendToken(user, res);
});
