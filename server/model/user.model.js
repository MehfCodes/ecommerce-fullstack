import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/appError.js';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is require'],
    minlength: [4, 'the length of the username must be more than 4'],
    maxlength: [20, 'the length of the username must be less than 20'],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, 'phone number is require'],
    minlength: [11, 'phone number must have 11 digits'],
    maxlength: [11, 'phone number must have 11 digits'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'please enter a valid email ',
    },
  },
  password: {
    type: String,
    minlength: [8, 'password must be at least 8 charcters'],
    maxlength: [256, 'password must be less than 256 charcters'],
    required: [true, 'please enter password'],
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: [8, 'confirm password must be at least 8 charcters'],
    maxlength: [256, 'confirm password must be less than 256 charcters'],
    required: [true, 'please enter confirm password'],

    validate: {
      validator(cp) {
        return cp === this.password;
      },
      message: 'password and confirm password must be exact the same',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// hash password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
  }
  return next();
});

//compare password
userSchema.methods.comparePassword = async function (input) {
  return await bcrypt.compare(input, this.password);
};

const model = mongoose.model('Users', userSchema);
export default model;
