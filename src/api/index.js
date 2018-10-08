import { version } from '../../package.json';
import { Router } from 'express';
import polygons from './polygons';

export default ({ config, db }) => {
  let api = Router();

  api.use('/polygons', polygons({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
