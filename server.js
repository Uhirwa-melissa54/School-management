const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roleRoutes = require('./routes/roleRoutes');
const config = require('config');
const debug = require('debug')('app:server');

const app = express();
// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(config.get('port'), () => {
      debug(`Server running on port ${config.get('port')}`);
    });
    return server;
  } catch (error) {
    debug('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; // Export for testing purposes
