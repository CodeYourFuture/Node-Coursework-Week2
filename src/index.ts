import express from 'express';
import dotenv from 'dotenv';
import createServer from './createServer';
import logger from './utils/logger';

dotenv.config();

const app:express.Application = createServer(1);
const PORT:number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
