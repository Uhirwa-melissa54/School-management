const UserRole = require('../models/UserRole');
const Joi = require('joi');
const debug = require('debug')('app:role');

const roleSchema = Joi.object({
  name: Joi.string().valid('admin', 'user').required(),
  description: Joi.string().required()
});

exports.createRole = async (req, res) => {
    console.log("ndebe....")
  try {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const role = new UserRole(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await UserRole.find();
    res.json(roles);
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};
