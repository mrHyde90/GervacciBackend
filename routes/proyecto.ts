import express from "express";
const router = express.Router();
const ProyectoController = require("../controllers/proyecto");

router.post("/crear_proyecto", ProyectoController.create_proyect);

router.get("/enviar_proyectos", ProyectoController.enviar_proyectos);

export default router;