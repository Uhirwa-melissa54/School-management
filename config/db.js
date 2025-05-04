const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:db');

const connectDB = async () => {
  try {
    // Mongoose connection options (remove deprecated ones)
    const mongooseOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4 // Use IPv4, skip IPv6
    };

    // Connect to MongoDB
    await mongoose.connect(config.get('mongoURI'), mongooseOptions);

    debug('MongoDB Connected Successfully');

    // Event handlers
    mongoose.connection.on('connected', () => {
      debug('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      debug(`Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      debug('Mongoose disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      debug('Mongoose connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    debug(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Global Mongoose configuration
mongoose.set('strictQuery', true); // Enforce strict query mode
mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;    // Map _id to id
    delete ret._id;      // Remove _id
    delete ret.__v;      // Remove version key
    return ret;
  }
});

module.exports = connectDB;
