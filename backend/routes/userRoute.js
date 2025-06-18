import express from 'express'
import { signup,login,logout,updateUsername,updatePassword} from '../controller/authUser.js';
import protectRoute from '../middleware/protectRoute.js';
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.patch("/updateusername",protectRoute,updateUsername);
router.patch("/updatepassword",protectRoute,updatePassword);
export default router;
