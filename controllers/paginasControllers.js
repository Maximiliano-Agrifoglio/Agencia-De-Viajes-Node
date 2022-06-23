import { Viaje } from '../models/viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
    
    //consultar a db / 3 Viajes del modelo de viaje
    // y consultar a db / 3 testimoniales del modelo de testimoniales
    // al mismo tiempo!

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3}) );

    try {
        const resultado = await Promise.all(promiseDB); 
 
        res.render('inicio.pug', {
         pagina: 'Inicio',
         clase: 'home',
         viajes: resultado[0],
         testimoniales: resultado[1]
       });

    } catch (error) {
        console.log(error);
    }
};
    


const paginaNosotros = (req, res) => {
    res.render('nosotros.pug', {
        pagina: 'Nosotros'
    });
};     

const paginaViajes = async (req, res) => {
    //cosultar BD
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes.pug', {
        pagina: ' proximos viajes',
        viajes
    });
};   

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales.pug', {
        pagina: 'testimoniales',
        testimoniales
    });

    } catch (error) {
        console.log(error);
    }
    
};     

const paginaDetalleViaje = async (req, res) => {
      const { slug } = req.params;  
      try {
         const viaje = await Viaje.findOne({ where : { slug } });
         
         res.render('viaje.pug', { 
            pagina: 'Información Viaje',
            viaje
         });
      } catch (error) {
         console.log(error)
      }
};
export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}