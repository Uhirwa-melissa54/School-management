const Course = require('../models/Course');
const Teacher = require('../models/Teacher'); // Add Teacher model import
const Joi = require('joi');
const mongoose = require('mongoose'); // Add mongoose import for ObjectId validation
const debug = require('debug')('app:course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Updated schema with ObjectId validation for teacher
const courseSchema = Joi.object({
  name: Joi.string().required(),
  teacher: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId validation')
    .required()
    .messages({
      'any.invalid': 'Teacher must be a valid ObjectId'
    }),
  courseCode: Joi.string().required()
});

exports.createCourse = [
  auth,
  admin,
  async (req, res) => {
    try {
      // Validate request body
      const { error } = courseSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      // Check if teacher exists
      const teacher = await Teacher.findById(req.body.teacher);
      if (!teacher) {
        return res.status(400).json({ message: 'Teacher not found' });
      }

      // Create and save the course
      const course = new Course(req.body);
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      debug(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Rest of the controller remains unchanged
exports.getCourses = [
  auth,
  async (req, res) => {
    try {
      const courses = await Course.find().populate('teacher', 'firstName lastName');
      res.json(courses);
    } catch (error) {
      debug(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.getCourse = [
  auth,
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate('teacher', 'firstName lastName');
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    } catch (error) {
      debug(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.updateCourse = [
  auth,
  async (req, res) => {
    try {
      const { error } = courseSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    } catch (error) {
      debug(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

exports.deleteCourse = [
  auth,
  admin,
  async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json({ message: 'Course deleted' });
    } catch (error) {
      debug(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];
