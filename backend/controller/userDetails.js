import User from "../model/User.js";

const getUser = async (req,res) =>{
    try{
        const users =await User.find({},{ username: 1, _id : 1});
        const usernames = users.map(user => user.username);
         
        res.status(200).json(users);
    }catch(err){
        console.log(`error in getUserdeatils controller ${err}`);
        res.status(500).json({ message: `error in getUserdeatils controller ${err}` });
    }
}
export {getUser}