import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactionHistory: [
        {
            amount: {type:Number},
            moneyflow:{type: String}, // "sent" or "received"
            to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            date: { type: Date, default: Date.now }
        },
    ],
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;

