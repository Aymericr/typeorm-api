import "reflect-metadata";
import 'module-alias/register';

import {createConnection} from "typeorm";
import express, {NextFunction, Request, Response} from 'express';
import BaseRouter from 'routers';
import {StatusCodes} from 'http-status-codes';

const startServer = async () => {
    await createConnection();

    const app = express();
    app.use(express.json());
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err, true);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: err.message,
        });
    });

    app.use('/', BaseRouter);

    const PORT = Number(3000);
    app.listen(PORT, () => {
        console.log(`Express server started on port: http://localhost:${PORT}`);
    });

};

startServer().then().catch(console.log);