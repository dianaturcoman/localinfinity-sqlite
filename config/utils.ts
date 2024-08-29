import * as fs from "fs";

const RSA_PRIVATE_KEY = fs.readFileSync("./config/private.key");

module.exports = RSA_PRIVATE_KEY;
