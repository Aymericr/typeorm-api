import "reflect-metadata";
import 'module-alias/register';
import {createConnection} from "typeorm";
import express, {NextFunction, Request, Response} from 'express';
import {Server, Socket} from "socket.io";
import { createServer } from "http";
import {StatusCodes} from 'http-status-codes';
import cors from 'cors';

// TODO: add https://github.com/typestack/socket-controllers
const startServer = async () => {
    await createConnection();

    const PORT = Number(3000);
    const app = express();
    app.set('port', PORT);

    let http = createServer(app);
    let serverIO = new Server(http, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    serverIO.on('connection', function (socket: any) {
        console.log(new Date(), 'connected', socket.id);
        socket.on('message', function (message: any) {
            console.log(new Date(), 'message', socket.id, message);
        });
    });

    app.use(express.json());
    app.use(cors({origin: '*'}));
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err, true);
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: err.message,
        });
    });

    const BaseRouter = require('routers');
    app.use('/', BaseRouter);


    // app.listen(PORT, () => {
    //     console.log(`Express server started on port: http://localhost:${PORT}`);
    // });

    http.listen(PORT, function () {
        console.log(`Express server started on port: http://localhost:${PORT}`);
    });

};

startServer().then().catch(console.log);