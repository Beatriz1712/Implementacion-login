//import fs from 'fs';
import { cartsModel } from '../../models/carts.model.js';

export default class CartManagerMongo{
    constructor() {
        this.model = cartsModel
}

    async createCart(){
        return await this.model.create({
        products: [], 
        })
    }

    async getCartById(cid){
        return await this.model.findOne({_id: cid})
    }

    async addProducToCart(cid, pid, quantity){
        const updatedCart = await this.model.findOneAndUpdate(
            {_id: cid, 'products.product': pid},
            {$inc: {'products.$.quantity': quantity}},//producto resultado de la busqueda
            {new: true}//retorna el producto modificado   
        )
        if (updatedCart){//condicion que depende si encontró el carrito
            //si encuentra el carrito,se actualiza la cantidad
            return updatedCart
        }

        //el producto no estaba en el carrito,se agrega quantity seleccionada
    const newProductInCart = await this.model.findOneAndUpdate(
        { _id: cid},
        { $push: { products: {product: pid, quantity}}}
    )
        return newProductInCart   
    }


    async deleteProductToCart({cid, pid}){
        return  await this.model.findOneAndUpdate({_id: cid}, {$pull: {products: {product: pid}}}, {new: true})
    }
}
