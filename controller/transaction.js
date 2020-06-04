const { Transaction, findUserTransactions, findTransaction } = require('../models/transaction');
const { findClientFromUser } = require('../models/client');
exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await findUserTransactions(req.user);
    res.status(200).json({
      status: true,
      data: { transactions }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await findTransaction(req.params.id);
    res.status(200).json({
      status: true,
      data: { transaction }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const client = await findClientFromUser(req.user);
    const tr = new Transaction({
      client,
      amount: req.body.amount,
      type: req.body.type,
      currency: { id: req.body.currency },
      category: { id: req.body.category }
    });
    await tr.create();
    res.status(200).json({
      status: true,
      data: { transaction: tr }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};