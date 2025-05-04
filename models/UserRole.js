const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not a valid role'
    },
    required: [true, 'Role name is required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true, // Add createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
module.exports = mongoose.model('UserRole', userRoleSchema);
