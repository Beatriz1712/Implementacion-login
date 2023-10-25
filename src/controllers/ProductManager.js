import { promises as fs } from "fs";
import { nanoid } from "nanoid"; //genera ids automaticos

class ProductManager {
  constructor() {
    this.productsFilePath = "./src/models/products.json"; //Crear la ruta del archivo
  }

  //? Lee los productos desde el archivo json.

  async readProducts() {
    let products = await fs.readFile(this.productsFilePath, "utf-8"); //Leer los arreglos en el arreglo de productos
    return JSON.parse(products);
  }

  //? Escribe los productos en el archivo json.

  async writeProducts(product) {
    await fs.writeFile(this.productsFilePath, JSON.stringify(product));
  }

  async existId(id) {
    let products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  }

  //? Agrega el producto al arreglo del archivo.


  async addProduct(product) {
    try {
      let previousProducts = await this.readProducts();
      const codeExists = previousProducts.some((prod) => prod.code === product.code); //Validar que el producto con codigo repetido no sea agregado.

    if (codeExists) {
      throw new Error(`Ya existe un producto con el código: ${product.code}`);
    }
      product.id = nanoid(5); //El numero que entra como parametro determina la cant de digitos del id.
      let allProducts = [...previousProducts, product];
      await this.writeProducts(allProducts);
      console.log( "\u001b[1;36m Producto agregado" )
      return "Producto agregado";
      
    } catch (error) {
      console.error("Se produjo un error al agregar el producto:", error);
     return "Error al agregar el producto";
    }

  }

  //? Obtener todos los productos contenidos en el arregl

  async getAllProducts() {
    return await this.readProducts();
  }

  //? Muestra el producto que corresponda a un id dado.

  async getProductId(id) {
    try {
      let productId = await this.existId(id); // Buscar con el id
      if (productId) {
        return productId;
      } else {
        throw new Error(`No se encontró ningún producto con el ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener el producto por ID: ", error);
      throw error;
    }
  }

  async updateProducts(id, product) {
    let productId = await this.existId(id); //Verifico si existe
    if (!productId) return "No se encuentra el producto";
    await this.deletProductId(id); //Si el producto existe lo borro
    let previousProducts = await this.readProducts();
    let products = [{ ...product, id: id }, ...previousProducts]; //Sumo el producto con su nuevo contenido en los productos contenidos en el array.
    await this.writeProducts(products);
    console.log( "\u001b[1;36m Producto actualizado" )
    return "Producto Actualizado";
  }

  //? Eliminar un producto

  async deletProductId(id) {
    let products = await this.readProducts();
    let productExists = products.some((prod) => prod.id === id); //Verifico si el producto existe.
    if (productExists) {
      let filterProducts = products.filter((prod) => prod.id != id); //Productos cuyo id no coincide con el buscado.
      await this.writeProducts(filterProducts); //Escribir el nuevo json
      console.log( "\u001b[1;31m Producto Eliminado" )
      return "Producto Eliminado";
    } else {
      return "No se encontró el producto a eliminar";
    }
  }
}

export default ProductManager;
