import express from 'express';
import router from './router/index.js';
import db from './config/db.js';
const app = express();

//conectar la base de datos msql
db.authenticate()
     .then( () => console.log('base de datos conectada...'))
     .catch( error => console.log('error'))

// Definiendo puerto
const port = process.env.PORT || 4000;

//habilitar pug.
app.set('wiew engine','pug');

//obtener el año actual.
app.use((req, res, next) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes'
    next();
});

//Agregar body parser para leer los datos del formulario.
app.use(express.urlencoded({extended: true}));

//definiendo la carpeta publica.
app.use(express.static('public'));

//agregando router. 
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});

