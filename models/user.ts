import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: true},
    matricula: {type: String, required: true, unique: true}, 
    contraseña: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telefono: {type: String, required: true, unique: true},
    carrera: {type: String, required: true},
    puntuaciones: [{
        valor: {type: Number, enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], default: 0}, 
        empresaID: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true}
    }],
    user_type: {type: String, enum: ["Aceptado", "Espera"], default: "Espera"}
});

userSchema.plugin(uniqueValidator);

export default  mongoose.model("User", userSchema);