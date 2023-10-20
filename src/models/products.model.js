import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//coleccion products
const productsCollection  = 'products';
const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        max:50,
        required:true
    },
    description:{
        type: String,
        max:50,
        required:true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: String,
    thumbnail: String,
    isValid: {
        type: Boolean,
        default: true
    }
})
//paginacion
productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollection, productsSchema)