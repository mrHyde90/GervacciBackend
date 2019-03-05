//User to Proyect , Company to User
//Unique Process to Change Users

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    usuarioID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    proyectoID: {type: mongoose.Schema.Types.ObjectId, ref: "Proyectos", required: true}, 
    empresaID: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true}
});

userSchema.plugin(uniqueValidator);

export default  mongoose.model("User", userSchema);