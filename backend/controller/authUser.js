import User from '../model/User.js'
import Account from '../model/Account.js';
import bcrypt from 'bcryptjs'
import generateWenToken from '../utils/generateWebToken.js';
import z from 'zod';

const signup = async (req, res) => {
    try {

        const signupSchema = z.object({
            username: z.string().min(3).max(30),
            email: z.string().email(),
            password: z.string().min(6)
        });
        const { username, email, password } = req.body;
        const validation = signupSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors[0]?.message });
        }

        let user = await User.findOne({ username: username });
        if (user) {
            res.status(400).json({ message: `username already exist` });
        }

        user = await User.findOne({ email: email });
        if (user) {
            res.status(400).json({ message: ` account with this email id already exist` });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword
        });

        if (newUser) {
            await newUser.save();
            generateWenToken(newUser._id, res);

            await Account.create({
                userId:newUser._id,
                balance: 1 + Math.floor(Math.random() * 10000)   
            });
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,

            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        console.log(`error in signup controller:${err}`);
        res.status(500).json({ error: `internal server error in signUp controller ${err}` });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

       generateWenToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.log(`error in login controller:${err}`);
        res.status(500).json({ error: `internal server error in login controller ${err}` });
    }
}

const logout = async (req, res) => {
    try {
        console.log("om");
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out succesfully" });
    } catch (err) {
        console.log(`error in logout controller:${err}`);
        res.status(500).json({ error: `internal server error in logout  controller ${err}` });
    }
}


const updateUsername = async (req, res) => {
    try {
        const { username } = req.body;

        const validation = z.string().min(3).safeParse(username);
        if (!validation.success) {
            return res.status(400).json({ message: "Enter a valid username." });
        }

        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.username = username;
        await user.save();

        res.status(200).json({ message: "Username updated successfully." });
    } catch (err) {
        console.error(`Error in updateUsername controller: ${err}`);
        res.status(500).json({ error: "Internal server error." });
    }
};





const updatePassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: " password and confirm password shoud be same" });
        }

        const validation = z.string().min(6).safeParse(password);
        if (!validation.success) {
            return res.status(400).json({ message: "Enter a valid username." });
        }

        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user.password = hashPassword;
        await user.save();

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        console.log(isPasswordCorrect);

        res.status(200).json({ message: "password updated successfully." });
    } catch (err) {
        console.error(`Error in updatePassword controller: ${err}`);
        res.status(500).json({ error: "Internal server error." });
    }
}

export { signup, login, logout, updateUsername,updatePassword };