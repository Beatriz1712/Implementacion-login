import mongoose from 'mongoose';

const cartsCollection  = 'carts';
const cartsSchema = new mongoose.Schema({

    products: {
       type :[{
        product: {
          type:  mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: Number
       }] 
    }                 
})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
//metodos acciones para interactuar con la base de datos

