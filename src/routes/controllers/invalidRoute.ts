import { Response, Request } from 'express';
import logger from '../../utils/logger';

export default function invalidRoute(req: Request, res: Response): void {
  logger.info(`INVALID ROUTE - ${req.method} - ${req.originalUrl}`);
  res.status(404).send('Nothing to see here');
}
