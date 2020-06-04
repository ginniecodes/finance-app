const { decodeToken } = require('./util');
const { findUser } = require('./models/user');

exports.auth = async function(req, res, next) {
  let token = req.header("Authorization");
  if(!token) {
    return res.sendStatus(401);
  }

  token = token.split(' ')[1];
  try {
    const data = decodeToken(token);
    const user = await findUser(data.user);
    req.user = user.id;
    req.isAdmin = user.isAdmin;
    next();
  } catch(error) {
    console.warn(error);
    res.status(401).end();
  }
}
exports.admin = function(req, res, next) {
  if(req.isAdmin) {
    next();
    return;
  }
  res.status(401).end();
};
