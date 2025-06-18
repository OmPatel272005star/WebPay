import express from 'express';
import {getBalance,transfer,history} from '../controller/transaction.js';
import protectRoute from '../middleware/protectRoute.js';
const router= express.Router();


router.get('/getbalance',protectRoute,getBalance);
router.post('/transfer',protectRoute,transfer);
router.get('/history',protectRoute,history)
export default router;
