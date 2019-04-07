import Empresa from "../models/empresa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";

// Por defecto la empresa se guarda como Esperar
// Los controladores que la empresa puede hacer

//Registrarse
exports.empresa_registrarse = async (req: Request, res: Response, next: Function) => {
    try{
        const empresas = await Empresa.find({email: req.body.email});
        if(empresas.length >= 1){
            return res.status(409).json({
                message: "Mail exist"
            });
        } else {
            //El mail no existe
            const hashh = await bcrypt.hash(req.body.contraseña, 10);
            const empresa = new Empresa({
                nombreEmpresa: req.body.nombreEmpresa,
                contraseña: hashh, 
                email: req.body.email,
                telefono: req.body.telefono,
                url: req.body.url,
                descripcion: req.body.descripcion,
                direccion: req.body.direccion,
                giro: req.body.giro
            });
            //Salvando el usuario en la base de datos
            const result = await empresa.save();
            return res.status(201).json({
                message: "empresa created",
                result: result
            });
        }
    }
    catch(err) {
        return res.status(500).json({err: err, message: "Empresa no pudo ser salvada"});
    }
}

exports.obtener_empresa = async (req: Request, res:Response, next: Function) => {
    try{
        const empresaId = req.params.id;
        const empresaFind = await Empresa.findById(empresaId);
        if(empresaFind != undefined){
            res.status(200).json({
                nombreEmpresa: empresaFind.nombreEmpresa,
                telefono: empresaFind.telefono,
                email: empresaFind.email,
                giro: empresaFind.giro
            });
        }
        res.status(400).json({
            message: "Empresa no encontrada"
        });
    }
    catch(err){
        return res.status(500).json({err: err, message: "Empresa no pudo ser enviada"});
    }
    
}

exports.empresa_iniciar_sesion = async (req: Request, res: Response, next: Function) => {
    try {
        //Si es dispositivo mobile, el token durara 3650 dias, por el contrario si es web, solo 10horas
        let expiracion = {servidor: "10h", cliente: 36000};
        if(req.body.dispositivo == "mobile"){
            expiracion["servidor"] = "3650d";
            expiracion["cliente"] = 0;
        }
        const empresa = await Empresa.findOne({email: req.body.email});
        //Si la empresano existe
        if(!empresa){
            return res.status(401).json({
                message: "Auth Failed, email does not recognized"
            });
        }
        //Si la empresa existe
        //Comparamos que sean las contrasenas iguales
        const result = await bcrypt.compare(req.body.contraseña, empresa.contraseña);
        //Si no hacen match, return
        if(!result){
            return res.status(401).json({
                message: "Auth failed, password incorrect"
            });
        }
        //si hacen match, Generamos el token
        const token = jwt.sign({
            email: empresa.email,
            empresaId: empresa._id,
            empresa_type: empresa.empresa_type
        }, "secret_this_should_be_longer", {expiresIn: expiracion["servidor"]});
        //Enviamos el json
        return res.status(200).json({
            token: token,
            expiresIn: expiracion["cliente"],
            empresaData: {
                _id: empresa._id,
                empresa_type: empresa.empresa_type,
                nombreEmpresa: empresa.nombreEmpresa
            }
        });

    }
    catch(err){
        res.status(401).json({
            message: "Auth failed"
        });
    }
}

exports.prueba = (req: Request, res: Response, next: Function) => {
    res.send("Hola amigos");
}