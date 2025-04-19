const express = require("express");
const Wallet = require("../models/Wallet");
const User = require("../models/User");
const WalletMoneyTransactions = require("../models/Transactions");

const router = express.Router();

router.post("/addAmount", async (req,res) => {
    try{
        const {userId, amount} = req.body;
        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({error:"Invalid user ID or amount"});
        }
        const userExies = await User.findById(userId);
        if (!userExies) {
            return res.status(400).json({error:"user not found"});
        }
        // here call cashfree api
        try{
            const cashFreeApiCall = true;
            if (cashFreeApiCall) {
                const session = await Wallet.startSession();
                session.startTransaction();
                try{
                    let walletTransaction = await Wallet.findOne({user: userId}).session(session);
                    if (walletTransaction) {
                        walletTransaction.amount += amount
                    }else{
                        walletTransaction = new Wallet({
                            user: userId,
                            amount
                        });
                    }
                    await walletTransaction.save({ session });
                    const transactionsHistory = new WalletMoneyTransactions({
                        user: userId,
                        amount,
                        type: "credit",
                        description:"Money Deposit",
                        status: "completed",
                        payment : "bank",
                        createdAt: new Date()
                    });
                    await transactionsHistory.save({session});
                    await session.commitTransaction();
                    session.endSession();
                    res.status(201).json({ 
                        message: "Amount added successfully", 
                        walletTransaction,
                        transactionsHistory 
                    });
                }catch(error){
                    res.status(500).json({ 
                        message: "Internal Server Error", 
                        walletTransaction,
                        transactionsHistory 
                    });
                }
            }else{
                return res.status(400).json({error:"The money was not Added"});
            }
        }catch(error){
            res.status(500).json({message: "Internal Server Error"});
        }

    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/getAmount/:userId", async (req,res) => {
   try{
    const walletAmount = await Wallet.find({user: req.params.userId}).populate("user");
    res.json(walletAmount);
   }catch(error){
    res.status(500).json({ error: error.message });
   }
});

module.exports = router;
