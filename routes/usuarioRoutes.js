import express from 'express';
import { formularioLogin, formularioRegistro, formularioOlvidePassword, registrarUsuario, confirmar, resetPassword, comprobarToken, nuevoPassword, autenticar } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', autenticar);

router.get('/registro', formularioRegistro);
router.post('/registro', registrarUsuario);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

//Almacenar el nuevo password
router.get('/reset-password/:token', comprobarToken);
router.post('/reset-password/:token', nuevoPassword);


export default router;
