import express from "express";
import { body } from "express-validator";
import { admin, crear, guardar } from "../controllers/propiedadController.js";

const router = express.Router();

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", crear);
router.post(
  "/propiedades/crear",
  body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La descripcion no puede ser mayor a 200 caracteres"),
  body("habitaciones")
    .isNumeric()
    .withMessage("Las habitaciones son obligatorias"),
   body("categoria").isNumeric().withMessage("La categoria es obligatoria"),
   body("precio").isNumeric().withMessage("El precio es obligatorio"),
   body("estacionamiento")
     .notEmpty()
     .withMessage("El numero de estacionamientos es obligatorio"),
    body("wc").notEmpty().withMessage("El numero de baños es obligatorio"),
    body('latitud').notEmpty().withMessage('La latitud es obligatoria'),

  guardar,
);

export default router;
