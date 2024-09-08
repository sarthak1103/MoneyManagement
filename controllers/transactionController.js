const Transaction = require('../models/addTransactionModel');


// Get Transactions
const getTransactions = async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;

        if (req.query.month) {
            const month = parseInt(req.query.month);
            const year = new Date().getFullYear();
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            filter.date = { $gte: startDate, $lt: endDate };
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const transactions = await Transaction.find(filter).skip(skip).limit(limit).exec();
        const totalTransactions = await Transaction.countDocuments(filter);
        res.status(200).json({
            total: totalTransactions,
            page,
            limit,
            totalPages: Math.ceil(totalTransactions / limit),
            transactions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Add Transaction
const addTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTransactions, addTransaction };
