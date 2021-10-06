// const express = require('express');

// const UserModel = require('../models/user.model');

// const router = express.Router();

// router.post('/api/consent', (req, res) => {
//   const { body } = req;
//   console.log(body);
//   const { is_new, mobile_number, user_id } = body;
//   localStorage.setItem('consent', 'Pending');
//   const data = createConsentArtifact(mobile_number);
//   const privateKey = fs.readFileSync('./keys/private_key.pem', {
//     encoding: 'utf8',
//   });
//   const detachedJWS = signature.makeDetachedJWS(privateKey, data);
//   const apiCall = createApiCall(HTTP_METHOD.POST, `/Consent`, detachedJWS, data);

//   apiCall
//     .then(async response => {
//       // save the response to database
//       console.log(response.data);
//       if (is_new) {
//         const user_data = {
//           primaryMobile: mobile_number,
//           aa_handle: `${mobile_number}@setu-aa`,
//           consent_requests: [
//             {
//               consent_handle: response.data.ConsentHandle,
//               raised_at: response.data.timestamp,
//               version: response.data.ver,
//               status: 'PENDING',
//             },
//           ],
//         };
//         try {
//           await UserModel.create(user_data);
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         const consent_request = {
//           consent_handle: response.data.ConsentHandle,
//           raised_at: response.data.timestamp,
//           version: response.data.ver,
//           status: 'PENDING',
//         };
//         try {
//           await UserModel.findByIdAndUpdate(user_id, consent_request, {
//             new: true,
//             runValidators: true,
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       }

//       const url = `${config.anumati_url}/${response.data.ConsentHandle}?redirect_url=${config.your_client_url}/redirect`;
//       res.send(url);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// module.exports = router;
