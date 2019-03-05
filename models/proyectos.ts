import mongoose from 'mongoose';

const proyectoSchema = new mongoose.Schema({
    nombreProyecto: {type: String, required: true},
    empresa: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true},
        nombreEmpresa: {type: String, required: true}
    },
    descripcion: {type: String, required: true},    
    vacantes: {type: Number, default: 1, required: true}, 
    duracion: {type: Date, default: Date.now},
    puntuaciones: [{
        valor: {type: Number, enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], default: 0}, 
        usuarioID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    }]
});

export default mongoose.model("Proyectos", proyectoSchema);