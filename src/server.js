import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { router} from "./routes/productsRouter.js";
import mongoose from "mongoose";
import cartsRouter from "./routes/cartsRouter.js";
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js"
import ProductManager from "./Daos/Mongo/ProductManager.js";
import CartManager from "./Daos/Mongo/CartManager.js";
import { Server } from "socket.io";

//import {http } from'http';

/*********config inicial**********/
const app = express();
const PORT = process.env.PORT || 8080;
const product = new ProductManager();
const cart = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/products', router);
app.use('/', viewsRouter);//vista template html del cliente

/********handlebars***************************/
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// static
app.use('/', express.static(__dirname + "/public"))


/********Conexion mostrando el puerto********/
//const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log("Escuchando en puerto " + PORT);
});


/**********rutas del CRUD de carts  y products*****middleware**********/
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


/********Config mongoose**********************/
//uri super conjunto de url http
mongoose.connect( "mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test")
.then(()=>{
    console.log("Conectada a la base de datos");
})
.catch(error => 
    console.error("Error al conectar a la base de datos",error))

 


/*
//config socket
const socketServer = new Server(httpServer);
let p = 0;
socketServer.on('connection', async (socket) => {
    p += 1;
    console.log(`${p} connected`);

    const products = await dbInstance.getProducts();
    socket.emit('productList', products);
//io.on
    socket.on('addProduct', async product => {
        console.log(" agregar producto");
        try {
            let c = await dbInstance.addProduct(product);
            const updatedProducts = await dbInstance.getProducts();
            console.log(updatedProducts);

            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('deleteProduct', async (idProduct) => {
        try {
            const c = await dbInstance.deleteProduct(idProduct);
            console.log(c);
            const updatedProducts = await dbInstance.getProducts();
            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts);
        } catch (error) {
            return;
        }
    });

    socket.on('disconnect', (mssg) => {
        p -= 1;
        console.log(`${p} connected`);
        console.log(mssg);
    });
});
*/
