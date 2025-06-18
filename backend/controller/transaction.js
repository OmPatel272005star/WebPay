import mongoose from "mongoose";
import Account from "../model/Account.js";
import User from '../model/User.js';

const getBalance = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);
        const isUserexist = await Account.findOne({ userId: userId });
        if (!isUserexist) {
            res.status(400).json({ message: "This account do not exist please request thriugh authentic account" });
        }

        res.status(200).json({
            balance: isUserexist.balance
        })
    } catch (err) {
        console.log(`error in getbalance controller ${err}`);
        res.status(500).json({ message: `error in getbalance controller ${err}` });
    }
}


const transfer = async (req, res) => {
    try {
        const { amount, to } = req.body;
        const receiverId = to;
        const senderId = req.user._id;
        

        // Input validation
        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be positive" });
        }
        if (receiverId == senderId) {
            return res.status(400).json({ message: "you can't send money to same account" })
        }
        // Get accounts
        const senderAccount = await Account.findOne({ userId: senderId });
        if (!senderAccount) return res.status(404).json({ message: "Sender account not found" });
        if (senderAccount.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

        const receiverAccount = await Account.findOne({ userId: receiverId });
        if (!receiverAccount) return res.status(404).json({ message: "Receiver account not found" });
         console.log(senderAccount +" this is " + receiverAccount);
        
        //Add Transaction to account
       
        const transactionDate =  new Date();

        
        const temp=senderAccount.transactionHistory.push({
            amount: amount,
            moneyflow: "sent",
            to: receiverId,
            from: senderId,
            date: transactionDate,
        })
        
       
        receiverAccount.transactionHistory.push({
            amount,
            moneyflow: "received",
            to: receiverId,
            from: senderId,
            date: transactionDate,
        });
        
        await senderAccount.save();
        await receiverAccount.save();
       


        // Perform updates
        const updateSender = await Account.updateOne(
            { userId: senderId },
            { $inc: { balance: -amount } }
        );

        const updateReceiver = await Account.updateOne(
            { userId: receiverId },
            { $inc: { balance: amount } }
        );

        // Verify updates
        const updatedSender = await Account.findOne({ userId: senderId });

        res.status(200).json({
            message: "Transfer successful",
            newBalance: updatedSender.balance,
            details: {
                senderUpdate: updateSender,
                receiverUpdate: updateReceiver
            }
        });

    } catch (err) {
        console.error("Transfer error:", err);
        res.status(500).json({ message: "Transfer failed", error: err.message });
    }
};


const history = async (req, res) => {
  try {
    const userId = req.user._id;

    // Populate sender and receiver usernames in transaction history
    const userAccount = await Account.findOne({ userId: userId })
      .populate("transactionHistory.from", "username")
      .populate("transactionHistory.to", "username");

    if (!userAccount) {
      return res.status(404).json({ message: "User account not found" });
    }

    // Format the transaction history
    const formattedHistory = userAccount.transactionHistory.map((txn) => {
      const dateObj = new Date(txn.date);

      return {
        amount: txn.amount,
        type: txn.moneyflow,
        from: txn.from?.username || "N/A",
        to: txn.to?.username || "N/A",
        date: dateObj.toLocaleDateString(),
        time: dateObj.toLocaleTimeString()
      };
    });

    res.status(200).json({
      message: "Transaction history fetched successfully",
      history: formattedHistory
    });

  } catch (err) {
    console.error("Transaction history error:", err);
    res.status(500).json({ message: "Could not fetch transaction history", error: err.message });
  }
};

export { getBalance, transfer,history };