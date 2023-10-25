import { Router } from "express";
import Products from "../dao/products.js";

const viewRouter = Router();

const productManager = new Products();

// PRODUCTS
viewRouter.get("/products", async (req, res) => {
  let products = await productManager.getAllProducts();
  let user = req.session.user;
  res.render("home", {  products , user});
});

//  CHATS
viewRouter.get("/chats", async (req, res) => {
  res.render("chats");
});

// CARTS
viewRouter.get("/carts", async (req, res) => {
  res.render("carts");
});

//  DETAIL PRODUCT
viewRouter.get("/product/:pid", async (req, res) => {
  let pid = req.params.pid;

  let result = await productManager.getProductId(pid);
  res.render("product", result);
});

//  REGISTRO Y LOGIN
viewRouter.get("/register", (req, res) => {
  res.render("register");
});

viewRouter.get("/", (req, res) => {
  res.render("login");
});

viewRouter.get("/profile", (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

export default viewRouter;
