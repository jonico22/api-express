const express = require('express');
const fs = require('fs');

const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let mensajes = [];
const productos = []
const ruta = './chat.txt'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

async function leerArchivo(ruta) {
    
    try {
        let resp =  await fs.promises.readFile(ruta, 'utf-8');
        return resp === '' ? [] : JSON.parse(resp)
    } catch (err) {
        console.log(err)
        return []
    }
}

async function grabarArchivo(ruta,newData) {
    try {
        await fs.promises.writeFile(ruta, newData);
    } catch (err) {
        throw new Error('No grabo el archivo');
    }
}



const routerProductos = require('./api/route');
app.use('/api/productos', routerProductos);


io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit('listProduct', productos);
    socket.on('newProductos',  (data)=>{
        productos.push(data);
        io.sockets.emit('listProduct', productos);
    });

    mensajes = await leerArchivo(ruta)
    socket.emit('mensajes', mensajes);
    socket.on('mensajeNuevo', async (data)=>{
        mensajes.push(data);
        await grabarArchivo(ruta,JSON.stringify(mensajes))
        io.sockets.emit('mensajes', mensajes);
    });
});
const PORT = 8080;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})
