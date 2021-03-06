import {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';

import UsersRouter from '@routers/users';
import MessagesRouter from '@routers/messages';

const BaseRouter = Router();

// API
BaseRouter.use('/users', UsersRouter);
BaseRouter.use('/messages', MessagesRouter);

BaseRouter.get('/', (req, res) => {
    res.send('Hello world!')
})

// 404 catch all
BaseRouter.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send();
});

module.exports = BaseRouter;