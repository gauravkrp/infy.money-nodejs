const axios = require('axios');
const uuid = require('./uuid');
const config = require('../config');

// GENERATE KEYS
const generateKeyMaterial = async () => {
  const { data: response } = await axios
    .get(`${config.rahasya_url}/ecc/v1/generateKey`)
    .catch(err => console.error(err));
  return response;
};

const dateNow = new Date();
// const OneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
const FIDATA_start = new Date(2020, 0, 1);
const FIDATA_end = new Date(2023, 0, 1);

const consentExpiry = FIDATA_end.toISOString();
const fiDataFrom = FIDATA_start.toISOString();

// CREATE BODY FOR DATA REQUEST
const requestDataBody = (signedConsent, consent_id, keyMaterial) => {
  const data = JSON.stringify({
    ver: '1.0',
    timestamp: dateNow.toISOString(),
    txnid: uuid.create_UUID(),
    FIDataRange: {
      from: fiDataFrom,
      to: consentExpiry,
    },
    Consent: {
      id: consent_id,
      digitalSignature: signedConsent.split('.')[2],
    },
    KeyMaterial: keyMaterial,
  });

  return data;
};

module.exports = { requestDataBody, generateKeyMaterial };
