const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fetch  = require('node-fetch');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- hbs Motor ----------------------*/
/*const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views/hbs'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    extname: 'hbs'
}));

app.set('view engine', 'hbs');*/

/* ---------------------- ejs Motor ----------------------*/

/*app.set('views', './views/ejs');
app.set('view engine', 'ejs');
*/

/* ---------------------- pug Motor ----------------------*/

app.set('views', path.join(__dirname, 'views/pug'));
app.set('view engine', 'pug');


app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/productos',async (req, res)=>{
    const response = await fetch('http://localhost:8080/api/productos');
    const productos = await response.json();
    res.render('list',{productos});
});

const routerProductos = require('./api/route');
app.use('/api/productos', routerProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})
