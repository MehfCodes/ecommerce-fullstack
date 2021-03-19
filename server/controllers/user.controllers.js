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

export const updateUser = catchAsync(async (req, res, next) => {
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
