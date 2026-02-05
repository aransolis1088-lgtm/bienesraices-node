import { validationResult } from "express-validator";
import { Precio, Categoria, Propiedad } from "../models/index.js";

const admin = async (req, res) => {
  const { id } = req.usuario;
  const propiedades = await Propiedad.findAll({
    where: {
      usuarioId: id,
    },
    include: [
      { model: Categoria, as: "categoria" },
      { model: Precio, as: "precio" },
    ],
  });

  res.render("propiedades/admin", {
    pagina: "Mis Propiedades",
    propiedades,
  });
};

const crear = async (req, res) => {
  // Consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    csrFToken: req.csrfToken(),
    categorias,
    precios,
    datos: {},
  });
};

const guardar = async (req, res) => {
  // Revisar errores
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    //Consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    // Errores
    return res.render("propiedades/crear", {
      pagina: "Crear Propiedad",
      csrFToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    latitud,
    longitud,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;

  const { id: usuarioId } = req.usuario;

  // Crear propiedad
  try {
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
      categoriaId,
      usuarioId,
      imagen: "",
    });
    const { id } = propiedadGuardado;
    res.redirect(`/mis-propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  const { id } = req.params;

  //Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  //Validar que la propiedad pertence a quien visite esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/agregar-imagen", {
    pagina: `Agregar Imagen ${propiedad.titulo}`,
    csrFToken: req.csrfToken(),
    propiedad,
  });
};

const almacenarImagen = async (req, resp, next) => {
  const { id } = req.params;

  //Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return resp.redirect("/mis-propiedades");
  }

  //Validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return resp.redirect("/mis-propiedades");
  }

  //Validar que la propiedad pertence a quien visite esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return resp.redirect("/mis-propiedades");
  }

  try {
    //Almacenar imagen y publicar propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;

    await propiedad.save();
    next();
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {
  const { id } = req.params;

  //Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //Revisar que usuario quien consulta es quien creo propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);
  res.render("propiedades/editar", {
    pagina: `Editar Propiedad: ${propiedad.titulo}`,
    csrFToken: req.csrfToken(),
    categorias,
    precios,
    datos: propiedad,
  });
};

const guardarCambios = async (req, res) => {
  //verificar la validación
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    //Consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    // Errores
    return res.render("propiedades/editar", {
      pagina: "Editar Propiedad",
      csrFToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  const { id } = req.params;

  //Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //Revisar que usuario quien consulta es quien creo propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //Reescribir el objeto y actualizarlo

  try{
      const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,latitud,longitud,precio: precioId,categoria: categoriaId,} = req.body;

      propiedad.set({
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
      })

      await propiedad.save();

      res.redirect('/mis-propiedades')

  }catch(error){
    console.log(error)
  }

};

export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
};
