const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/register', teacherController.register);
router.post('/login', teacherController.login);
router.get('/', auth, teacherController.getTeachers);
router.delete('/:id', auth, admin, teacherController.deleteTeacher);

module.exports = router;
