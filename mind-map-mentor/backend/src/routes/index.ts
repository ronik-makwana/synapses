// API v1 router — mounts all resource routers (mirrors app/api/api_v1/api.py).
import { Router } from 'express';

import login from './login';
import users from './users';
import notes from './notes';
import files from './files';
import graph from './graph';
import ai from './ai';

const apiRouter = Router();

apiRouter.use('/login', login);
apiRouter.use('/users', users);
apiRouter.use('/notes', notes);
apiRouter.use('/files', files);
apiRouter.use('/graph', graph);
apiRouter.use('/ai', ai);

export default apiRouter;
