const { findCurrencies, findCurrency } = require('../models/currency');

exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await findCurrencies();
    res.status(200).json({
      status: true,
      data: { currencies }
    });
  } catch (error) {
    res.status(400).end(error.message);
  }
};

exports.getCurrency = async (req, res) => {
  try {
    const currency = await findCurrency(req.params.id);
    res.status(200).json({
      status: true,
      data: { currency }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

