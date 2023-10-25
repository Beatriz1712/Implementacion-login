import { Router } from "express";
import Cart from "../dao/carts.js";

const cartRouter = Router(); //Crear enrutador
const cartManager = new Cart();

//? ----------- Metodos Cart

//POST CART
cartRouter.post("/", async (req, res) => {
  let newCart = req.body;
  res.send(await cartManager.saveCart(newCart));
});

// GET CART
cartRouter.get("/", async (req, res) => {
  try {
    let carts = await cartManager.getAllCart();
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al buscar carritos" + error);
  }
});

// GET CART BY ID 
cartRouter.get("/:idCart", async (req, res) => {
  let idCart = req.params.idCart;
  try {
    let carts = await cartManager.getCartId(idCart);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Carrito no encontrado" + error);
  }
});

// UPDATE CART
cartRouter.put("/:idCart", async (req, res) => {
  let { idCart } = req.params;
  let cartsToReplace = req.body;
  if (
    !cartsToReplace.description ||
    !cartsToReplace.quantity ||
    !cartsToReplace.total
  ) {
    res.send({ status: "error", error: "No hay datos en parametros" });
  }
  let result = await cartManager.updateCart(idCart, cartsToReplace);
  res.send({ status: "sucess", payload: result });
});

// DELETE CART 
cartRouter.delete("/:idCart", async (req, res) => {
  let idCart = req.params.idCart;
  try {
    let carts = await cartManager.deleteCart(idCart);
    console.log("\u001b[1;34m Carrito eliminado" + error);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al eliminar carrito " + error);
  }
});

//? ----------- Metodos Products in cart

//POST PRODUCT IN CART
cartRouter.post("/:idCart/products/:idProducts", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProducts;
  try {
    let carts = await cartManager.insertProductCart(idCart, idProduct);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al insertar producto al carrito " + error);
  }
});

// UPDATE PRODUCT IN CART
cartRouter.put("/:idCart/products/:idProduct", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProduct;
  let newQuantity = req.body.quantity;

  try {
    const result = await cartManager.updateProductCart(
      idCart,
      idProduct,
      newQuantity
    );
    res.send({ result: "sucess", payload: result });
  } catch (error) {
    console.log(
      "\u001b[1;34m Error al actualizar cantidad de producto en el carrito " +
        error
    );
  }
  const result = await cartManager.updateProductCart(
    idCart,
    idProduct,
    newQuantity
  );
  res.send({ result: "sucess", payload: result });
});

// DELETE PRODUCT IN CART
cartRouter.delete("/:idCart/products/:idProducts", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProduct;
  res.send(await cartManager.deleteProductCart(idCart, idProduct));
});

export default cartRouter;

// DELETE ALL PRODUCTS OF CART
cartRouter.delete("/:idCart/products", async (req, res) => {
  let idCart = req.params.idCart;
  res.send(await cartManager.deleteAllProductsCart(idCart));
});
