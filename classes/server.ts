import express from 'express';
import http from 'http';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.httpServer = new http.Server(this.app);
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    start(callback: Function, port: number){
        this.httpServer.listen(process.env.PORT ||port, callback);
    }
}