const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');

const app = express();

const todosRouter = require('./controllers/todos');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error: ', error.message);
  }
};

connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/todos', todosRouter);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
