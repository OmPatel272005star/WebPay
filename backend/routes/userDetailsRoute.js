import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { getUser } from '../controller/userDetails.js';
const router=express.Router();

router.get('/details',getUser)

export default router;