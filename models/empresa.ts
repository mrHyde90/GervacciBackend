import mongoose, {Schema, Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IEmpresa extends Document{
    nombreEmpresa: string;
    descripcion: string;
    url: string;
    telefono: string;
    email: string;
    contraseña: string;
    direccion: string;
    empresa_type: string;
    giro: string;
}

const empresaSchema = new Schema({
    nombreEmpresa: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true},    
    url: {type: String, default: ""}, 
    telefono: {type: String, default: ""},
    email: {type: String, required: true},
    contraseña: {type: String, required: true},
    direccion: {type: String, required: true }, 
    empresa_type: {type: String, enum: ["Aceptado", "Espera"], default: "Espera"},
    giro: {type: String, required: true}
});

empresaSchema.plugin(uniqueValidator);


export default mongoose.model<IEmpresa>("Empresa", empresaSchema);