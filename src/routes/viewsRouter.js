import { Router } from 'express';
import ProductManagerMongo from "../Daos/Mongo/ProductManager.js"

export const router = Router();
/*
router.get('/login', (req, res) => {
    res.render('login')
})
*/
/*
router.get('/register', (req, res) => {
    res.render('register')
})
*/
router.get('/', (req, res) => {
    res.render('index', {
        name : 'Coder'
    })
})
router.get('/products', async (req, res) => {
    // lógica
    const {limit, numPage, sort} = req.params
    let serviceProducts = new ProductManagerMongo()
    const {
        docs,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
        page
    } = await serviceProducts.getProducts({limit, page: numPage, sort: {price: sort}, lean: true})

    res.status(200).render('products', {
        products: docs,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
        page
    })
})
router.get('/realtimeproducts', (req, res) => {
    res.status(200).render('realTimeProduct')
})
router.get('/carts', (req, res) => {
    res.status(200).render('carts')
})
/*
router.get('/contacto', (req,res) => {
    
    res.render('contactos', {nombre: 'Beatriz'})
})
*/
export default router
