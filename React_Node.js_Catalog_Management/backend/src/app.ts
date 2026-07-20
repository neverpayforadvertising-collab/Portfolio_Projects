import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logRequests } from './middleware/logging.js';
import { validateApiKey } from './middleware/auth.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(logRequests);

// CHANGED: health endpoint moved ABOVE validateApiKey. It previously lived in
// routes/index.ts behind the API-key middleware, so Docker healthchecks and
// load balancers received 401s. It must stay public.
app.get('/api/v1/health', (_, res) => res.status(200).json({ status: 'ok' }));

app.use(validateApiKey);
app.use('/api/v1', routes);
app.use(errorHandler);

export default app;
