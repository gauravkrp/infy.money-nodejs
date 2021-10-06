/**
 * zen-pfm-backend
 * express app
 * Author: Gaurav Pandey (https://github.com/gauravkrp)
 */

// create an express app
const express = require('express');
const cors = require('cors');

const app = express();
const axios = require('axios');
const localStorage = require('localStorage');
const jwkToPem = require('jwk-to-pem');
const fs = require('fs');

// UTILS
const config = require('./src/config');
const uuid = require('./src/utils/uuid');
const signature = require('./src/utils/request_signing');
const requestData = require('./src/utils/request_data');
const createConsentArtifact = require('./src/utils/consent_request');
const decrypt_data = require('./src/utils/decrypt_data');
const { HTTP_METHOD } = require('./src/utils/enums');
const UserRouter = require('./src/routes/user.route');
const { connect } = require('./src/db');

// use the express-static middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(express.static('public'));

// connect to db;
connect();

// global api axios config
const axiosInstance = axios.create({
  baseURL: config.api_url,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json',
    'client_api_key': config.client_api_key,
  },
});

// create request object to be passed in api calls.
const createApiCall = (http_method, url, jws, data = null) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axiosInstance({
    method: http_method,
    url,
    headers: {
      ...axiosInstance.defaults.headers.common,
      'x-jws-signature': jws,
    },
    data,
  });

// methods used in routes ---------------

// FETCH DATA REQUEST
const fi_data_fetch = (session_id, encryption_privateKey, keyMaterial) => {
  const privateKey = fs.readFileSync('./keys/private_key.pem', {
    encoding: 'utf8',
  });
  const detachedJWS = signature.makeDetachedJWS(privateKey, `/FI/fetch/${session_id}`);
  const apiCall = createApiCall(HTTP_METHOD.GET, `/FI/fetch/${session_id}`, detachedJWS);

  apiCall
    .then(response => {
      decrypt_data(response.data.FI, encryption_privateKey, keyMaterial);
    })
    .catch(error => {
      console.log(error);
    });
};

// FI DATA REQUEST
const fi_data_request = async (signedConsent, consent_id) => {
  const keys = await requestData.generateKeyMaterial();
  const request_body = requestData.requestDataBody(signedConsent, consent_id, keys.KeyMaterial);
  const privateKey = fs.readFileSync('./keys/private_key.pem', {
    encoding: 'utf8',
  });
  const detachedJWS = signature.makeDetachedJWS(privateKey, request_body);
  const apiCall = createApiCall(HTTP_METHOD.POST, `/FI/request`, detachedJWS, request_body);

  apiCall
    .then(async response => {
      // Ideally, after this step we save the session ID in your DB
      // and wait for FI notification and then proceed.
      // await UserModel.findByIdAndUpdate(user_id,
      //   {
      //     session_id: response.data.sessionId,
      //   },
      //   {
      //     new: true,
      //     runValidators: true,
      //   });
      fi_data_fetch(response.data.sessionId, keys.privateKey, keys.KeyMaterial);
    })
    .catch(error => {
      console.log(error);
    });
};

// FETCH SIGNED CONSENT
const fetchSignedConsent = consent_id => {
  const privateKey = fs.readFileSync('./keys/private_key.pem', {
    encoding: 'utf8',
  });
  const detachedJWS = signature.makeDetachedJWS(privateKey, consent_id);
  const apiCall = createApiCall(HTTP_METHOD.GET, `/Consent/${consent_id}`, detachedJWS);

  apiCall
    .then(response => {
      fi_data_request(response.data.signedConsent, consent_id);
    })
    .catch(error => {
      console.log(error);
    });
};

/**
 * API Routes
 */

// define the first/default route
app.get('/api/', (req, res) => {
  res.send({
    status: true,
    message: 'Hello from ZenMoney PFM API',
  });
});

// upon redirect from setu AA webview screens
app.get('/api/redirect', (req, res) => {
  console.log('redirecting...');
  res.send('redirecting...');
});

app.use(`/api/users`, UserRouter);

// CREATE CONSENT CALL
app.get('/api/consent/:mobileNumber', (req, res) => {
  const { mobileNumber } = req.params;
  localStorage.setItem('consent', 'Pending');
  const body = createConsentArtifact(mobileNumber);
  const privateKey = fs.readFileSync('./keys/private_key.pem', {
    encoding: 'utf8',
  });
  const detachedJWS = signature.makeDetachedJWS(privateKey, body);
  const apiCall = createApiCall(HTTP_METHOD.POST, `/Consent`, detachedJWS, body);

  apiCall
    .then(response => {
      // save the response to database
      // ToDo routes/consent.route.js
      console.log(response.data);
      const url = `${config.anumati_url}/${response.data.ConsentHandle}?redirect_url=${config.your_client_url}/redirect`;
      res.send(url);
    })
    .catch(error => {
      console.log(error);
    });
});

// CONSENT NOTIFICATION
app.post('/api/Consent/Notification', (req, res) => {
  const { body, headers } = req;
  console.log('body', body);

  const public_key_obj = JSON.parse(fs.readFileSync('./keys/setu_public_key.json', 'utf8'));
  const public_pem = jwkToPem(public_key_obj);

  if (signature.validateDetachedJWS(headers['x-jws-signature'], body, public_pem)) {
    const consent_id = body.ConsentStatusNotification.consentId;
    const consent_status = body.ConsentStatusNotification.consentStatus;

    localStorage.setItem('consent_id', consent_id);
    localStorage.setItem('consent_status', consent_status);

    if (consent_status === 'ACTIVE') {
      fetchSignedConsent(consent_id);
    }

    const dateNow = new Date();
    res.send({
      ver: '1.0',
      timestamp: dateNow.toISOString(),
      txnid: uuid.create_UUID(),
      response: 'OK',
    });
  } else {
    res.send('Invalid Signature');
  }
});

// FI NOTIFICATION
app.post('/api/FI/Notification', (req, res) => {
  const { body, headers } = req;
  const obj = JSON.parse(fs.readFileSync('./keys/setu_public_key.json', 'utf8'));
  const pem = jwkToPem(obj);

  if (signature.validateDetachedJWS(headers['x-jws-signature'], body, pem)) {
    // Do something with body
    // Ideally you wait for this notification and then proceed with Data fetch request.
    const dateNow = new Date();
    res.send({
      ver: '1.0',
      timestamp: dateNow.toISOString(),
      txnid: uuid.create_UUID(),
      response: 'OK',
    });
  } else {
    res.send('Invalid Signature');
  }
});

// GET DATA
app.get('/api/get-data', (req, res) => {
  res.send(JSON.parse(localStorage.getItem('jsonData')));
});

// 404 error
app.all('/api/*', (req, res) => {
  res.status(404).send('Sorry, nothing found for this path!').end();
});

// start the server listening for requests
app.listen(config.port || 3000, () => console.log('Server is running...'));
