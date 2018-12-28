import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Routes} from './routes/routes';
import * as mongoose from 'mongoose';
import {ErrorHandler} from './helpers/errorHandler';
import {Jwt} from './helpers/jwt';

class App {
    app: express.Application;
    routePrv: Routes = new Routes();
    mongoUrl: string = 'mongodb://localhost/finance';

    constructor() {
        this.app = express();
        this.app.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            next();
        });
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(new Jwt().jwt());
        this.app.use(new ErrorHandler().errorHandler);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;
