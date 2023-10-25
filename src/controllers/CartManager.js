import { promises as fs } from "fs";
import cartModel from "../models/carts.model.js"
import ProductManager from "./ProductManager.js";

const totalProduct = new ProductManager();

class CartManager extends cartModel {
  constructor() {
    super();
  }

  // READ CART
  async readCart() {
    try {
      let carts = await CartManager.find({}).populate({
        path: "products.productId",
        model: "products",
        select: "description price image stock",
      });
      return carts;
    } catch (error) {
      console.log("\u001b[1;36m Error al obtener carritos: ", error);
      return [];   
    }
  }

  async addCart(dataCart) {
    
  }

  async writeCart(cart) {
    await fs.writeFile(this.cartFilePath, JSON.stringify(cart));
  }

  async existId(cid) {
    let carts = await this.readCart();
    return carts.find((cart) => cart.id === cid);
  }

 

  async getCartd(cid) {
    let cid = await this.existId(cid);
    if (!cid) return "Carrito no encontrado";
    return cid;
  }

  async addProductCart(cid, pid) {
    const cid = await this.existId(cid);
    if (!cid) return "Carrito no encontrado";

    const productById = await totalProduct.existId(pid);
    if (!productById) return "Producto no encontrado";

    const allCart = await this.readCart();

    for (const cartItem of allCart) {
      if (cartItem.id === cid) {
        const existingProduct = cartItem.products.find(
          (product) => product.id === pid
        );
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cartItem.products.push({ id: pid, quantity: 1 });
        }
      }
    }

    await this.writeCart(allCart);
    console.log("\u001b[1;36m Producto agregado al carrito");
    return "Producto agregado al carrito";
  }
}

export default CartManager;
