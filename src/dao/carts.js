import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

export default class Cart {
  constructor() {}

  //********Metodos Cart

  // GET
  //Consulta de todos los CARTS generados
  getAllCart = async () => {
    try {
      let result = await cartModel.find().lean();
      console.log("\u001b[1;36m Carritos Cargados");
      return result;
    } catch (error) {
      console.log("\u001b[1;31m Error al cargar carritos");
    }
  };

  //GET BY ID CART
  //Consultar el carrito con un id en especifico suministrado.
  getCartId = async (cid) => {
    try {
      const cart = await cartModel.findById(cid);
      console.log("\u001b[1;36m Carrito Encontrado: ");
      return cart;
    } catch (error) {
      console.log("\u001b[1;31m Carrito NO Encontrado");
    }
  };

  // POST
  //Crear un carrito nuevo
  saveCart = async (cart) => {
    try {
      await cartModel.create(cart);
      return "Carrito agregado";
    } catch (error) {
      console.error("Error al agregar el carrito", error);
      return "Error al agregar el carrito";
    }
  };

  // PUT
  //Actualizar un carrito con determinado id
  updateCart = async (cid, cart) => {
    let result = await cartModel.findByIdAndUpdate(cid, cart, { new: true }); //Entrego el id y entrego la data que debo actualizar
    console.log("\u001b[1;36m Cart actualizado");
    return result;
  };

  // DELETE
  //Eliminar el carrito con un id en especifico suministrado.
  deleteCart = async (cid) => {
    let result = await cartModel.deleteOne({ _id: `${cid}` });
    console.log("\u001b[1;31m Cart Eliminado");
    return result;
  };

  //************* Metodos Productos en el carrito

  //POST PRODUCT IN CART
  //Insertar un producto en un carrito determinado.

  insertProductCart = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return "Carrito no encontrado";
      const existingProduct = cart.products.find(
        (product) => product.idProduct === pid
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          productId: idProduct,
          quantity: 1,
        });
      }
      await cart.save();
      console.log("\u001b[1;36m Producto Agregado al carrito");
      return cart;
    } catch (error) {
      throw "Error al insertar producto en carrito" + error;
    }
  };

  // UPDATE PRODUCT IN CART
  //Teniendo en cuenta el id de un producto contenido en un carrito, se modifica.

  updateProductCart = async (cid, pid, newQuantity) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) {
        return "Carrito no encontrado";
      }

      console.log(pid);
      const product = await productModel.findById(pid);
      console.log(product);
      if (!product) {
        return "Producto no encontrado";
      }
      const existingProduct =
        Array.isArray(cart.products) &&
        cart.products.find((product) => product._id.toString() === pid);

      console.log("----->" + existingProduct);

      if (existingProduct) {
        const result = await cartModel.findOneAndUpdate(
          { _id: cid, "products._id": pid },
          { $set: { "products.$.quantity": newQuantity } },
          { new: true }
        );

        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  // DELETE PRODUCT FROM CART
  //Eliminar un producto de un carrito especifico, con los id suministrados tanto de cart como de product.

  deleteProductCart = async (cid, pid) => {
    {
      try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
          return "Carrito no encontrado";
        }
        const productIndex = cart.products.findIndex(
          (product) => product.productId === pid
        );

        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          return "Producto eliminado del carrito";
        } else {
          return "Producto no encontrado en el carrito";
        }
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        return "Error al eliminar el producto del carrito";
      }
    }
  };

  // DELETE ALL PRODUCTS IN CART
  //Eliminar todos los productos contenidos en un carrito

  deleteAllProductsCart = async (cid) => {
    try {
      const cart = await cartModel.findById(cid);

      if (!cart) {
        return "Carrito no encontrado";
      }
      cart.products = [];

      await cart.save();

      return "Productos eliminados del carrito";
    } catch (error) {
      console.error("Error:", error);
      return "Error al eliminar los productos del carrito";
    }
  };
}
