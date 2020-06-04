const { findUser, findUsers } = require('../models/user');

exports.getMyUser = async (req, res) => {
  try {
    const user = await findUser(req.user);
    res.status(200).json({
      status: true,
      data: { user }
    });
  } catch (error) {
    res.status(400).end(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await findUser(req.params.id);
    res.status(200).json({
      status: true,
      data: { user }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.status(200).json({
      status: true,
      data: { users }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};


exports.getMyUserInformation = async (req, res) => {
  try {
    const client = await findClientFromUser(req.user);
    res.status(200).json({
      status: true,
      data: { client }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
}