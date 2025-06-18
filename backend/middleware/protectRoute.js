import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        
        console.log("omprotect");
        if (!token) {
            return res.status(401).json({ error: "Unautorized : No toke provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({ error: "Unautorized Invalid Token" });
        }
      
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found:" });
        }

        req.user = user;

        next();

    } catch (err) {
        console.log("error in protectRoute middleware : ", err);
        res.status(500).json(`Internal server error ${err}`);
    }
}

export default protectRoute