import app from './app.js';
import { startJobWorkers } from './jobs/worker.js';
import logger from './middleware/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT || 4000);

app.listen(port, async () => {
  logger.info(`Catalog operations backend listening on port ${port}`);
  await startJobWorkers();
});
