const express = require('express');
const methodOverride = require('method-override');
const app = express();

// Configuración
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Datos de ejemplo
let tareas = ['Estudiar JavaScript', 'Ir al gym', 'Ver clases en DH'];

// Rutas
app.get('/', (req, res) => {
    res.render('index', { tareas });
});

app.post('/agregar', (req, res) => {
    const nuevaTarea = req.body.tarea;
    tareas.push(nuevaTarea);
    res.redirect('/');
});

app.delete('/eliminar/:tarea', (req, res) => {
    const tareaAEliminar = req.params.tarea;
    tareas = tareas.filter(tarea => tarea !== tareaAEliminar);
    res.redirect('/');
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
