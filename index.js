import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

import db from './config/db.js';


//Crear la app
const app = express();


//Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

//Habilitar cookie parser
app.use(cookieParser());


//Habilitar CSRF
app.use(csurf({ cookie: true }));



//Conectar la base de datos
db.authenticate()
    .then(() => db.sync().then(() => console.log('Base de datos conectada')))
    .catch(error => console.log(error));


app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta publica
app.use(express.static('public'));

//Routing
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);



//Definir un puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});