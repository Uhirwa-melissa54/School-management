const Teacher = require('../models/Teacher');
const UserRole = require('../models/UserRole');

module.exports = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.user.id).populate('role');
    if (!teacher || teacher.role.name !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
