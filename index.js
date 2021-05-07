const request = require('request');

try {
  require('dotenv').config({ path: 'local.env' })
} catch (error) {
  console.error(error);
}

const spotsChecker = require("./spotsChecker");

spotsChecker();