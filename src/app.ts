import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import handlebars, { unregisterHelper, ParseOptions, create, RuntimeOptions } from 'handlebars';
import path from 'path';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

//Routes
import indexRoutes from './routes';
import usuarioRoutes from './routes/usuario';
import loginRoutes from './routes/login';
import recuperarSenhaRoutes from './routes/recuperarSenha';
import brokerRoutes from './routes/broker';
import connectBrokerRoutes from './routes/conectBroker';
import topicoRoutes from './routes/topico';

class Application {

    app: express.Application;

    constructor() {

        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            handlebars: allowInsecurePrototypeAccess(handlebars),
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'

        }));

        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/usuario', usuarioRoutes);
        this.app.use('/login', loginRoutes);
        this.app.use('/recuperarSenha', recuperarSenhaRoutes);
        this.app.use('/broker', brokerRoutes);
        this.app.use('/conectar', connectBrokerRoutes);
        this.app.use('/topico', topicoRoutes);
        
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });

    }
}


export default Application;