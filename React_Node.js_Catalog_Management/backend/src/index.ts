// CHANGED: dotenv is now loaded via side-effect import BEFORE any other module.
// Previously dotenv.config() ran after db.ts/redisClient.ts had already read
// process.env at import time, so values from .env were ignored.
import 'dotenv/config';
import app from './app.js';
import { startJobWorkers } from './jobs/worker.js';
import logger from './middleware/logger.js';

const port = Number(process.env.PORT || 4000);

app.listen(port, async () => {
  logger.info(`Catalog operations backend listening on port ${port}`);
  await startJobWorkers();
});
