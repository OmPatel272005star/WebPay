import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/, 
            'Please enter a valid email address'
        ]

    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },

});

const User = mongoose.model("User", UserSchema);
export default User