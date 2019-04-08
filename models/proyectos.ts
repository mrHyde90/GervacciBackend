import mongoose,  {Schema, Document}  from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IProyecto extends Document{
    nombreProyecto: string;
    empresa: {nombreEmpresa: string, id: mongoose.Schema.Types.ObjectId};
    descripcion: string;
    vacantes: Number;
    duracion: string;
    puntuaciones: {valor: Number, usuarioID: mongoose.Schema.Types.ObjectId}[];
    selecciones: {type: mongoose.Schema.Types.ObjectId}[];
    recompensas: string;
}


const proyectoSchema = new mongoose.Schema({
    nombreProyecto: {type: String, required: true},
    empresa: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true},
        nombreEmpresa: {type: String, required: true}
    },
    descripcion: {type: String, required: true},    
    vacantes: {type: Number, default: 1, required: true}, 
    duracion: {type: String},
    puntuaciones: [{
        valor: {type: Number, enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], default: 0}, 
        usuarioID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    }],
    selecciones: [{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}],
    recompensas: {type: String}
});

proyectoSchema.plugin(uniqueValidator);
export default mongoose.model<IProyecto>("Proyectos", proyectoSchema);