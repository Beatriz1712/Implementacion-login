import { Router } from 'express';
import {productsModel} from '../models/products.model.js'
import ProductManagerMongo from "../Daos/Mongo/ProductManager.js"

export const router
 = Router();
const serviceProducts = new ProductManagerMongo();

//trae todos los productos
router.get('/',async(req,res) => {
    const {limit = 10, page= 1, order=1, category} = req.query
    const filtro = category ? {category} : {}
    const products = await productsModel.paginate({},{ limit: parseInt(limit), page: parseInt(page), sort: {price: parseInt(order)}, lean: true})
   
    if(!products){
        res.send({status: 'error', error: 'No se encontraron productos'})
    }
    res.send({status: 'success', payload: products})
})

// Trae los productos por Id
router.get('/:pid', async (req, res) => {

    try {
        const { pid}= req.params
        const filtro = {_id: pid}
        const productDetails =  await productsModel.findOne(filtro);
        res.send({
            status: 'success', payload: productDetails
        })
        //res.send("viewdetails",{product: productDetails})
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
})

//crea productos
router.post("/", async (req, res) => {
    try{
        const newProduct = req.body
        //let{ title, description, code, price, stock } = req.body
        if (!newProduct.title ||  !newProduct.description  || !newProduct.code || !newProduct.price  ||!newProduct.stock  ) {
                res.send({
                    status: 'error',
                    error: 'No se encontró todos los parametros'
                })
            }  
            let result= await serviceProducts.create(newProduct)
            res.send({
                status: 'success',
                payload: result
            })
    } catch (error) {
        console.log(error);
    }
   
})


router.put("/:pid", async (req, res) => {
    let { pid } = req.params
    let productsToReplace = req.body
    if(!productsToReplace.title ||  !productsToReplace.description  || !productsToReplace.code ||
         !productsToReplace.price  || !productsToReplace.stock ){
            res.send({
                result: 'error',
                error: 'Debe enviar un id de producto  y datos a modificar'
            })  
    }
    let result = await productsModel.updateOne({
        _id: pid}, productsToReplace)
    res.send({
        result: 'success',
        payload: result
    })
})

router.delete("/:pid", async (req, res) => {
    let { pid } = req.params
    let result = await productsModel.deleteOne({
        _id:pid })
        res.send({
            result: 'success',
            payload: result  
        })
})
/**********limit******** */
//http://localhost.8080/api/products/limit/numeroLimite
router.get("/limit/:limit", async (req, res)=>{
    let limit = parseInt(req.params.limit)
    if (isNaN(limit) || limit <= 0){
        limit = 10;//valor predeterminado
    }
    res.send(await product.getProductByLimit(limit))
})
/**********page************ */
router.get("/page/:page", async (req, res)=>{
    let page = parseInt(req.params.page)
    if (isNaN(page) || page <= 0){
        page = 1;//valor predeterminado
    }
    const productsPerPage  = 1;
    res.send(await product.getProductByPage(page, productsPerPage))
})

export default router



