import { catchAsync } from './../utils/catchAsync.js';
import Users from './../model/user.model.js';
import { AppError } from '../utils/appError.js';

export const getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  if (!user) {
    return next(new AppError('user not found', 404));
  }
  res.status(200).json({
    data: user,
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find({});
  if (users.length === 0) {
    return next(new AppError('there is no user', 204));
  }
  res.status(200).json({ data: users });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const user = await Users.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!user) {
    return next(new AppError('update user failed', 406));
  }
  res.status(200).json({ data: user });
});
