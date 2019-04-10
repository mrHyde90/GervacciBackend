//User to Proyect , Company to User
//Unique Process to Change Users

import mongoose, {Schema, Document} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUptocu extends Document{
    usuarioID: mongoose.Schema.Types.ObjectId;
    proyectoID: mongoose.Schema.Types.ObjectId;
    empresaID: mongoose.Schema.Types.ObjectId;
    user_type: Boolean;
}

const uptocuSchema = new mongoose.Schema({
    usuarioID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    proyectoID: {type: mongoose.Schema.Types.ObjectId, ref: "Proyectos", required: true}, 
    empresaID: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true},
    user_type: {type:Boolean, default: false}
});

uptocuSchema.plugin(uniqueValidator);

export default  mongoose.model<IUptocu>("User", uptocuSchema);