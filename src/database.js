const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
const express = require('express');
const app = express();
var port = process.env.PORT || 3900;
const MongoClient = require('mongodb').MongoClient;



mongoose.connect('mongodb+srv://AndreaAldana:Paralelepipedo_98@cluster0.ipklg.mongodb.net/MERNTasks? retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
            console.log('La conexion a mongodb se realizo correctamente!');

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                    console.log('Servidor corriendo en http://localhost:' + port);

            });

    });

    module.exports = mongoose;