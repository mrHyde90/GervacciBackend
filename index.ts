import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

const server  = Server.instance;

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Configuracion del cors
server.app.use(cors({
    origin: true,
    credentials: true
}));

server.app.get("/", (req, res) => {
    res.send("Hola mundo");
});

server.start(() => {
    console.log("Servidor corriendo en el puerto 5000");
}, 5000);