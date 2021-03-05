import Users from '../model/user.model.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const signUp = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);
  if (!user) {
    next(new AppError('sign up failed', 400));
  }
  res.status(200).json({ data: user });
});
