import express from "express";
const router = express.Router();
const ProyectoController = require("../controllers/proyecto");

router.post("/crear_proyecto", ProyectoController.create_proyect);

router.get("/enviar_proyectos", ProyectoController.enviar_proyectos);

//router.get("/usuario_proyectos", ProyectoController.usuario_proyectos);

//router.put("/aceptar_usuario", ProyectoController.aceptar_usuario);

router.get("/enviar_proyecto/:id", ProyectoController.enviar_proyecto);

//router.post("/inscribirse_proyecto/:id", ProyectoController.inscribirse_proyecto);

router.get("/empresa_ver_proyectos", ProyectoController.empresa_ver_proyectos);

export default router;