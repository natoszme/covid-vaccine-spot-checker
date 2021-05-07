require("@babel/register");

try {
  require('dotenv').config({ path: 'local.env' })
} catch (error) {
  console.error(error);
}

const spotsChecker = require("./spotsChecker").default;

spotsChecker();