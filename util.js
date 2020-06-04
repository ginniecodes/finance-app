const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');


exports.getRandomString = length => crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);

exports.sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};


exports.encodeToken = data => {
  const { SECRET_KEY } = process.env;
  const private = readFileSync(SECRET_KEY);
  return jwt.sign(data, private, {
    algorithm: 'RS256',
    expiresIn: '1d'
  });
};

exports.decodeToken = token => {
  const { CERT_KEY } = process.env;
  const private = readFileSync(CERT_KEY);
  return jwt.verify(token, private, { algorithm: ['RS256'] });
};
