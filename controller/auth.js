const { User, login } = require('../models/user');
const { Client } = require('../models/client');

exports.login = async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.cookie('Authorization', `Bearer ${token}`, { expires: new Date(Date.now() + (60000 * 60 * 24)) })
    return res.status(200).json({
      status: true,
      data: { token }
    });
  } catch(error) {
    res.status(400).end(error.message);
  }
};

exports.register = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      isAdmin: false
    })
    await user.create()

    // must send date as yyyy/mm/dd
    const [yearstr, monthstr, daystr] = req.body.birthdate.split('-')
    const date = new Date(parseInt(yearstr), parseInt(monthstr) -1, parseInt(daystr));

    const client = new Client({
      fullName: req.body.fullName,
      birthdate: date,
      user
    });

    await client.create()
    res.status(200).json({
      data: {
        user: user.id,
        client: client.id,
        isAdmin: user.isAdmin
      }
    })
  } catch(error) {
    res.status(400).end(error.message)
  }
}