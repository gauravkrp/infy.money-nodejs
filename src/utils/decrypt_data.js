const axios = require('axios');
const localStorage = require('localStorage');
// const uuid = require("./uuid");
const config = require('../config');

const decrypt_data = (fi, privateKey, keyMaterial) => {
  const fi_data = fi[0];
  const body = {
    base64Data: fi_data.data[0].encryptedFI,
    base64RemoteNonce: fi_data.KeyMaterial.Nonce,
    base64YourNonce: keyMaterial.Nonce,
    ourPrivateKey: privateKey,
    remoteKeyMaterial: fi_data.KeyMaterial,
  };
  const requestConfig = {
    method: 'post',
    url: `${config.rahasya_url}/ecc/v1/decrypt`,
    data: body,
  };

  axios(requestConfig)
    .then(res => {
      const { base64Data } = res.data;
      const decoded_data = Buffer.from(base64Data, 'base64').toString();
      localStorage.setItem('jsonData', JSON.stringify(decoded_data));
    })
    .catch(err => console.log(err));
};

module.exports = decrypt_data;
