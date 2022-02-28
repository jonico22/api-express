const express = require('express');
const fs = require('fs');

const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const bodyParser = require('body-parser');

const { optionsSqlLite } = require('./config/optionsSqlLite');
const ModelChat =  require('./api/model/Chat')
const Chat = new ModelChat(optionsSqlLite); 

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let mensajes = [];
const productos = []
const ruta = './chat.txt'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*
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
}*/

const batch = async () =>{
    try {
        console.log("tabla creada");
        await Chat.crearTabla();
        mensajes = await  Chat.listar();
        console.log(mensajes);
    } catch (error) {
        console.error(error);
    } finally {
        Chat.cerrarConexion();
    }
}

const saveChat = async (data) =>{
    try {
        console.log(data);
        const ChatSave = new ModelChat(optionsSqlLite); 
       let respuesta = await ChatSave.insertar(data);
       console.log(respuesta)
    } catch (error) {
        console.error(error);
    } finally {
        Chat.cerrarConexion();
    }
}

batch()



const routerProductos = require('./api/route');
app.use('/api/productos', routerProductos);


io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    
    socket.emit('listProduct', productos);
    socket.on('newProductos',  (data)=>{
        productos.push(data);
        io.sockets.emit('listProduct', productos);
    });
   
    
    socket.emit('mensajes', mensajes);

    socket.on('mensajeNuevo', async (data)=>{
        mensajes.push(data);
        await saveChat(data);
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
