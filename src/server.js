//Dependencias
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import chalk from "chalk";
import * as path from "path"
import FileStore from 'session-file-store'

// Fuentes de metodos, informacion y vistas.
import __dirname from "./utils.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/view.routes.js";
import messageRouter from "./routes/message.routes.js";
import sessionRouter from "./routes/sessions.routes.js"


//!**** SERVER
//Inicializar variables Servidor
const app = express();
const PORT = 8080;
const fileStorage = FileStore(session)

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware
app.use(express.static(__dirname + '/public')); //Rutas

//!**** CONECT DATABASE  */
//Validar conexion a la base de datos
mongoose
mongoose
  .connect(
    "mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test"
  )
  .then(() => {
    console.log("\u001b[1;36mConectada a la base de datos");
  })
  .catch((error) =>
    console.error("\u001b[1;36mError al conectar a la base de datos", error)
  )

//**** SESSIONS IN DATABASE */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://beatriz1712sc:soynuevabasededatos@cluster0.2gm0bzy.mongodb.net/test",
      ttl: 3600,/* tiempo devida*/
    }),
    secret: "clave",
    resave: false,
    saveUninitialized: false,
  })
);

//**** HANDLEBARS */

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//**** RUTAS CRUD 

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/message", messageRouter);
app.use("/session", sessionRouter);

//****  SERVER  */
app.listen(PORT, () => {
  console.log(chalk.bgYellowBright.black.bold(`Escuchando en puerto: ${PORT}`));
});
