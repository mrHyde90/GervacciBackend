import Empresa from "../models/empresa";
import Proyecto from "../models/proyectos";
import {Request, Response} from "express";

// Crear Proyecto
exports.create_proyect = async (req: Request, res: Response, next: Function) => {
    try{
        var newProyect = new Proyecto({
            nombreProyecto: req.body.nombreProyecto,
            descripcion: req.body.descripcion,
            vacantes: parseInt(req.body.vacantes),
            duracion: req.body.duracion,
            empresa: {
                nombreEmpresa: req.body.nombreEmpresa,
                id: req.body.id
            }
        });

        const result = await newProyect.save();
        return res.status(201).json({
            message: "Proyecto creado",
            result: result
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresa no pudo ser salvada"});
    }
}

exports.enviar_proyectos = async (req: Request, res: Response, next: Function) => {
    try{
        const proyectos = await Proyecto.find();
        return res.status(200).json({
            proyectos: proyectos.map(proyectoFind => {
                return {
                    _id: proyectoFind._id,
                    nombreProyecto: proyectoFind.nombreProyecto,
                    vacantes: proyectoFind.vacantes,
                    nombreEmpresa: proyectoFind.empresa.nombreEmpresaa
                }
            })
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Proyectos no pudieron ser enviados"});
    }
}

