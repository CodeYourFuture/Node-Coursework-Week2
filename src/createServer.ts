import express from 'express';
import cors from 'cors';
import routes from './routes';
import invalidRoute from './routes/controllers/invalidRoute';

export default (v: number): express.Application => {
  const app: express.Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());
  app.use(`/api/v${v}/`, routes);
  app.get('*', invalidRoute);
  return app;
};
