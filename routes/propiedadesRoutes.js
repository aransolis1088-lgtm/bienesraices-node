import express from "express";
import { body } from "express-validator";
import {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen
} from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";
import upload  from "../middleware/subirImagen.js";

const router = express.Router();

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crear);
router.post(
  "/propiedades/crear",
  protegerRuta,
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
  body("latitud").notEmpty().withMessage("La latitud es obligatoria"),

  guardar,
);

router.get("/mis-propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);

router.post("/mis-propiedades/agregar-imagen/:id", protegerRuta, upload.single("imagen"), almacenarImagen);

export default router;
