import { Router } from 'express';
import {cartsModel} from '../models/carts.model.js'
import CartManagerMongo from '../Daos/Mongo/CartManager.js';

export const router = Router();
       const serviceCarts = new CartManagerMongo()

/********el id lo crea Atlas*********/
/********se crea end points*******/
//trae carrito by Id
router.get("/:cid", async (req, res) => {

    try {
        const {cid} = req.params
        const cart = await serviceCarts.getCartById(cid)
        res.send({
            result:'success',
            payload: cart
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// /api/carts/:cid/products/pid
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid , pid} = req.params
    const {quantity} = req.body
    

    const result= await serviceCarts.addProducToCart(cid, pid, quantity)
    res.send({status: 'success',
              payload: result
})
    
})
// /api/carts/:cid/products/pid
router.delete("/:cid/products/pid", async (req, res) => {
    let { cid } = req.params
    let result = await cartsModel.deleteOne({
        _id: cid })
        res.send({
            result: 'success',
            payload: result  
        })
})
//  /api/carts/:cid
router.put("/:cid", async (req, res) =>{

})
//  /api/carts/:cid
router.delete("/:cid", async (req, res) =>{

})
export default router