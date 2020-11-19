const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
var port = process.env.PORT || 3900;
var mongoose = require('mongoose');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes o urls
app.use('/api/tasks', require('./routes/task.routes'))


// Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server

mongoose.connect('mongodb+srv://AndreaAldana:Paralelepipedo_98@cluster0.ipklg.mongodb.net/MERNTasks? retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
            console.log('La conexion a mongodb se realizo correctamente!');

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                    console.log('Servidor corriendo en http://localhost:' + port);

            });

    });