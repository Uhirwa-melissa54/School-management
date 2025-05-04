const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, admin, courseController.createCourse);
router.get('/', auth, courseController.getCourses);
router.get('/:id', auth, courseController.getCourse);
router.put('/:id', auth, courseController.updateCourse);
router.delete('/:id', auth, admin, courseController.deleteCourse);

module.exports = router;
