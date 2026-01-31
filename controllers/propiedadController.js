import {validationResult} from 'express-validator';
import {Precio, Categoria, Propiedad} from '../models/index.js';

const admin = (req, res) => {
  res.render("propiedades/admin", {
    pagina: "Mis Propiedades",
    barra: true,
  });
};

const crear = async(req, res) => {
  // Consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ]);
  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    barra: true,
    csrFToken: req.csrfToken(),
    categorias,
    precios,
    datos: {}
  });
};

const guardar = async (req, res) => {
   // Revisar errores
   let resultado = validationResult(req);
   if(!resultado.isEmpty()){
      //Consultar modelo de precio y categorias
      const [categorias, precios] = await Promise.all([
          Categoria.findAll(),
          Precio.findAll()
      ]);

       // Errores
       return res.render('propiedades/crear', {
           pagina: 'Crear Propiedad',
           barra: true,
           csrFToken: req.csrfToken(),
           categorias,
           precios,
           errores: resultado.array(),
          datos: req.body
       });
   }

   const {titulo, descripcion, habitaciones, estacionamiento, wc, calle, latitud, longitud, precio: precioId, categoria: categoriaId} = req.body;

   // Crear propiedad
   try{
      const propiedadGuardado = await Propiedad.create({
         titulo,
         descripcion,
         habitaciones,
         estacionamiento,
         wc,
         calle,
         latitud,
         longitud,
         precioId,
         categoriaId
      });
      res.redirect('/propiedades/admin');
   }catch (error) {
      console.log(error);
   }
}

export { admin, crear, guardar };
