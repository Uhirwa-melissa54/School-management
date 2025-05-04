const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required']
  },
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Remove these explicit index definitions as unique: true already creates the index
// courseSchema.index({ courseCode: 1 });
// courseSchema.index({ teacher: 1 });

module.exports = mongoose.model('Course', courseSchema);
