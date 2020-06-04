const { findClientCategories, findCategory } = require('../models/category');
const { findClientFromUser } = require('../models/client');

exports.getMyCategories = async (req, res) => {
  console.log("CATEGORY", req.user);
  try {
    const client = await findClientFromUser(req.user);
    console.log(client);
    const categories = await findClientCategories(client.id);
    console.log(categories);
    res.status(200).json({
      status: true,
      data: { categories }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
}

exports.getCategory = async (req, res) => {
  try {
    const category = await findCategory(req.params.id);
    res.status(200).json({
      status: true,
      data: { category }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const client = await findClientFromUser(req.user);
    const category = new Category({
      client,
      name: req.body.name
    });

    await category.create();

    res.status(200).json({
      status: true,
      data: { category }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const category = await findCategory(req.params.id);
    await category.update({ name: req.body.name });
    res.status(200).json({
      status: true,
      data: { category }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await findCategory(req.params.id);
    await category.delete();
    res.status(200).json({
      status: true
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
}