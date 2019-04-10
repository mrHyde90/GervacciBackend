import Empresa from "../models/empresa";
import Proyecto from "../models/proyectos";
import {Request, Response} from "express";
import UPtoCU from "../models/UPtoCU";
import { request } from "http";

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

// Enviar proyecto
exports.enviar_proyecto = async (req: Request, res: Response, next: Function) => {
    try{
        const projectId = req.params.id;
        const proyecto = await Proyecto.findById(projectId);
        if(proyecto != undefined){
            res.status(200).json({
                _id: proyecto._id,
                nombreProyecto: proyecto.nombreProyecto,
                vacantes: proyecto.vacantes,
                nombreEmpresa: proyecto.empresa.nombreEmpresa,
                empresaId: proyecto.empresa.id,
                descripcion: proyecto.descripcion,
                duracion: proyecto.duracion
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
} 

//Empresa puede ver sus proyectos creados
exports.empresa_ver_proyectos = async (req: Request, res: Response, next: Function ) => {
    try{ 
        const empresaID = req.query.empresaID;
        const proyectosEmpresa = await Proyecto.find({"empresa.id": empresaID});
        const proyectosClean = proyectosEmpresa.map(proyectoFind => {
            return { 
                nombreProyecto: proyectoFind.nombreProyecto,
                vacantes: proyectoFind.vacantes
            }
        })
        res.status(200).json({
            proyectosClean
        })
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}

// Usuaio ver proyectos
/*
exports.usuario_proyectos = async (req: Request, res: Response) => {
    try{
        const aceptado = req.query.aceptado;
        const usuarioID = req.query.usuarioID;
        const proyectosFound = await Proyecto.find({"inscritos": {"usuarioID": usuarioID, aceptado: aceptado}});
        res.status(200).json({
            message: "Proyectos encontrados",
            proyectos: proyectosFound
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}*/

// Usuario ver proyectos
/*exports.usuario_proyectos = async (req: Request, res: Response, next: Function) => {
    try{ 
        const aceptado = req.body.aceptado;
        const usuarioID = req.body.usuarioID;
        const proyectosUPtoCU = await UPtoCU.find({userID: usuarioID, user_type: aceptado});
        if(proyectosUPtoCU == undefined){
            res.status(200).json({
                isProjects: false
            });
        }
        const proyectosUPtoCU_ids = proyectosUPtoCU.map(proyects => proyects.proyectoID);
        res.status(200).json({
            proyectos_ids: proyectosUPtoCU_ids
        });
        //const proyectos = await Proyecto.find({});
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}

*/
//db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})  { $set: { "grades.$.std" : 6 } }
// Aceptar o rechazar usuarios 
/*
exports.aceptar_usuario = async (req: Request, res: Response, next: Function) => {
    try{
        const aceptado = req.body.aceptado;
        const projectID = req.body.projectID;
        const userID = req.body.userID;
        await Proyecto.updateOne({_id: projectID, inscritos: {$elementMatch: {usuarioID: userID}} }, {$set: {"inscritos.$.aceptado": aceptado}});
        res.status(200).json({
            message: aceptado
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}*/

// aceptar o rechazar usuarios usuarios
/*exports.aceptar_usuario = async (req: Request, res: Response, next: Function) => {
    try{
        const aceptado = req.body.aceptado;
        const projectID = req.body.id;
        const result = await UPtoCU.update({_id: projectID}, {$set: {user_type: aceptado}});
        res.status(200).json({
            message: aceptado,
            result: result
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
} */

// Inscribirse proyecto
/*
exports.inscribirse_proyecto = async (req: Request, res: Response, next: Function) => {
    try {
        const projectID = req.params.id;
        const projectFound = await Proyecto.findById(projectID);
        
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}*/

// Inscribirse en proyecto
/*exports.inscribirse_proyecto = async (req: Request, res: Response, next: Function) => {
    try {
        const projectId = req.params.id;
        const empresaId = req.body.empresaId;
        const userId = req.body.userId;
        var newUptoco = new UPtoCU({
            usuarioID: userId,
            proyectoID: projectId,
            empresaID: empresaId
        }); 
        const result = await newUptoco.save();
        res.status(200).json({
            message: "proyecto seleccionado!",
            result: result
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error en enviar proyecto",
            err: err
        });
    }
}*/

// enviar proyectos
exports.enviar_proyectos = async (req: Request, res: Response, next: Function) => {
    try{
        const proyectos = await Proyecto.find();
        return res.status(200).json({
            proyectos: proyectos.map(proyectoFind => {
                return {
                    _id: proyectoFind._id,
                    nombreProyecto: proyectoFind.nombreProyecto,
                    vacantes: proyectoFind.vacantes,
                    nombreEmpresa: proyectoFind.empresa.nombreEmpresa
                }
            })
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Proyectos no pudieron ser enviados"});
    }
}

