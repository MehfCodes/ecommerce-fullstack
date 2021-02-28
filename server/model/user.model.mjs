import mongoose, { mongo } from 'mongoose';

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
    length: [11, 'phone number must have 11 digits'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
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
    maxlength: [8, 'password must be less than 256 charcters'],
    required: [true, 'please enter password'],
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: [8, 'confirm password must be at least 8 charcters'],
    maxlength: [8, 'confirm password must be less than 256 charcters'],
    required: [true, 'please enter confirm password'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model('Users', userSchema);
export default model;
