import {exit} from 'node:process';
import categorias from "./categorias.js";  
import precios from "./precios.js";  

import {Categoria, Precio} from "../models/index.js";

import db from "../config/db.js";

const importData = async () => {
    try {
        //Autenticarte y sincronizar la base de datos
        await db.authenticate();
        //Generar las columnas
        await db.sync({force: true});

        //Insertar los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios)
        ]);
        console.log('Datos importados correctamente');
        exit(0);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        exit(1);
    }
};

const eliminarDatos = async () => {
    try {
        await Promise.all([
            Categoria.destroy({where: {}, truncate: true}),
            Precio.destroy({where: {}, truncate: true})
        ]);
        console.log('Datos eliminados correctamente');
        exit(0);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        exit(1);
    }
}

if(process.argv[2] === '-i') {
    importData();
}
if(process.argv[2] === '-e') {
    eliminarDatos();
}