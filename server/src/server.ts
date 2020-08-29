import express from 'express';
import cors from 'cors';
import * as path from 'path';
import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());

const tmpFolder = path.resolve(__dirname, '..', 'tmp');

app.use('/files', express.static(tmpFolder));

app.use(routes);

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
