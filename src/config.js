/**
 * config.js
 */

// "use strict";

// Load environment variables from the `.env` file.
require('dotenv').config();

module.exports = {
  // Server port.
  port: process.env.PORT || 5000,
  api_url: process.env.SETU_API_URL,
  anumati_url: process.env.SETU_ANUMATI_URL,
  client_api_key: process.env.CLIENT_API_KEY,
  rahasya_url: process.env.SETU_RAHASYA_URL,
  your_client_url: process.env.YOUR_CLIENT_URL,
  db: process.env.MONGODB_URI_PROD,
};
