import express from "express";
const router = express.Router();
const EmpresaController = require("../controllers/empresa");

router.post("/registrarse", EmpresaController.empresa_registrarse);

router.post("/iniciar_sesion", EmpresaController.empresa_iniciar_sesion);

router.get("/prueba", EmpresaController.prueba);

router.get("/:id", EmpresaController.obtener_empresa);

export default router;