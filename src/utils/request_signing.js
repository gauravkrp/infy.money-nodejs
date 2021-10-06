const rs = require('jsrsasign');
const base64url = require('base64url');

const makeDetachedJWS = (privateKey, body) => {
  const header = { alg: 'RS256', typ: 'JWT' };
  const jwt = rs.KJUR.jws.JWS.sign(null, header, body, privateKey);
  console.log('jwt---makeDetachedJWS', jwt);
  const splittedJWS = jwt.split('.');
  splittedJWS[1] = '';
  return splittedJWS.join('.');
};

const validateDetachedJWS = (detachedJWS, body, publicKey) => {
  console.log('body', body);
  const splitted_jws = detachedJWS.split('.');
  splitted_jws[1] = base64url(JSON.stringify(body));
  const jwt = splitted_jws.join('.');
  console.log(jwt);
  const isValid = rs.KJUR.jws.JWS.verify(jwt, publicKey, ['RS256']);
  console.log(isValid);
  return isValid; // boolean
};

module.exports = { makeDetachedJWS, validateDetachedJWS };
