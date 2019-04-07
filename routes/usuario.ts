import express from "express";
const router = express.Router();
const UserController = require("../controllers/usuario");

router.post("/registrarse", UserController.user_registrarse);

router.post("/iniciar_sesion", UserController.user_iniciar_sesion);

router.get("/prueba", UserController.prueba);

router.get("/:id", UserController.obtener_usuario);

export default router;