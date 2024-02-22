import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
    minLength: [3, 'Title must contain at least 3 Characters!'],
    maxLength: [50, 'Title cannot exceed 30 Characters!'],
  },
  description: {
    type: String,
    required: [true, 'Please provide decription.'],
    minLength: [20, 'Description must contain at least 30 Characters!'],
    maxLength: [1000, 'Description cannot exceed 500 Characters!'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
  country: {
    type: String,
    required: [true, 'Please provide a country name.'],
  },
  city: {
    type: String,
    required: [true, 'Please provide a city name.'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location.'],
    minLength: [3, 'Location must contian at least 20 characters!'],
  },
  fixedSalary: {
    type: Number,
    minLength: [1, 'Salary must contain at least 1 digits'],
    maxLength: [4, 'Salary cannot exceed 3 digits'],
  },
  salaryFrom: {
    type: Number,
    minLength: [1, 'Salary must contain at least 1 digits'],
    maxLength: [3, 'Salary cannot exceed 3 digits'],
  },
  salaryTo: {
    type: Number,
    minLength: [1, 'Salary must contain at least 1 digits'],
    maxLength: [3, 'Salary cannot exceed 3 digits'],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Job = mongoose.model('Job', jobSchema);
