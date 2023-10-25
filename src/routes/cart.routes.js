import { Router } from "express";
import Cart from "../dao/carts.js";

const cartRouter = Router(); //Crear enrutador
const cartManager = new Cart();

//----------- Metodos Cart

//POST CART
cartRouter.post("/", async (req, res) => {
  let newCart = req.body;
  res.send(await cartManager.saveCart(newCart));
});

// GET CART
cartRouter.get("/", async (req, res) => {
  try {
    let carts = await cartManager.getAllCart();
    res.send({
       result: "sucess",
       payload: carts 
      });
  } catch (error) {
    console.log("\u001b[1;34m Error al buscar carritos" + error);
  }
});

// GET CART BY ID 
cartRouter.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  try {
    let carts = await cartManager.getCartId(cid);
    res.send({
       result: "sucess",
       payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Carrito no encontrado" + error);
  }
});

// UPDATE CART
cartRouter.put("/:cid", async (req, res) => {
  let { cid } = req.params;
  let cartsToReplace = req.body;
  if (
    !cartsToReplace.description ||
    !cartsToReplace.quantity ||
    !cartsToReplace.total
  ) {
    res.send({ status: "error", error: "No hay datos en parametros" });
  }
  let result = await cartManager.updateCart(cid, cartsToReplace);
  res.send({
     status: "sucess",
     payload: result });
});

// DELETE CART 
cartRouter.delete("/:cid", async (req, res) => {
  let cid = req.params.idCart;
  try {
    let carts = await cartManager.deleteCart(cid);
    console.log("\u001b[1;34m Carrito eliminado" + error);
    res.send({
       result: "sucess",
       payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al eliminar carrito " + error);
  }
});

// ----------- Metodos Products in cart

//POST PRODUCT IN CART
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  try {
    let carts = await cartManager.insertProductCart(cid, pid);
    res.send({
       result: "sucess", 
       payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al insertar producto al carrito " + error);
  }
});

// UPDATE PRODUCT IN CART
cartRouter.put("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let newQuantity = req.body.quantity;

  try {
    const result = await cartManager.updateProductCart(
      cid,
      pid,
      newQuantity
    );
    res.send({ 
      result: "sucess",
      payload: result });
  } catch (error) {
    console.log(
      "\u001b[1;34m Error al actualizar cantidad de producto en el carrito " +
        error
    );
  }
  const result = await cartManager.updateProductCart(
    cid,
    pid,
    newQuantity
  );
  res.send({
     result: "sucess",
     payload: result });
});

// DELETE PRODUCT IN CART
cartRouter.delete("/cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  res.send(await cartManager.deleteProductCart(cid, pid));
});

export default cartRouter;

// DELETE ALL PRODUCTS OF CART
cartRouter.delete("/:cid/products", async (req, res) => {
  let cid = req.params.cid;
  res.send(await cartManager.deleteAllProductsCart(cid));
});
