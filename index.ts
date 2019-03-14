import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/usuario";


const server  = Server.instance;

//Connection with mongoose
//mongoose.connect('mongodb+srv://torres:Q9gkAo6tFmr2gSFS@cluster0-ehxpx.mongodb.net/test?retryWrites=true')
mongoose.connect('mongodb://a00516283:Neverreal1995@ds213896.mlab.com:13896/gercvacci')
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
        console.log("Conexion fallida");
    });

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Configuracion del cors
server.app.use(cors({
    origin: true,
    credentials: true
}));

server.app.use("/usuarios", userRoutes);

server.start(() => {
    console.log("Servidor corriendo en el puerto 5000");
}, 5000);