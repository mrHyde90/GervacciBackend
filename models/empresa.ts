import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const empresaSchema = new mongoose.Schema({
    nombreEmpresa: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true},    
    url: {type: String, default: ""}, 
    telefono: {type: String, default: ""},
    email: {type: String, required: true},
    contraseña: {type: String, required: true},
    direccion: {type: String, required: true }
});

empresaSchema.plugin(uniqueValidator);


export default mongoose.model("Empresa", empresaSchema);