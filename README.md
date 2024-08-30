### project configuration file

# "sqlite" project purpose: REST API backend for localinfinity project

Tutorial: https://geshan.com.np/blog/2021/10/nodejs-sqlite/

# Install SqLite3

Install on Windows: https://www.configserverfirewall.com/windows-10/install-sqlite3-on-windows-10/

Unzip file and copy to a location.

Add the location to the environment variable PATH

Test by running > sqlite3 --version

# sqlite3 commands

enter sqlite shell: > sqlite3
exit: > .exit
open existing database file \*.sqlite: > sqlite3 : > attach "bica.sqlite" as db1;

# start the app

> npm start

# available api calls

- GET /api/login
- POST /api/login
  {
  "username": ""
  }
- GET /api/fritzbox

# Libraries

@sqlite3 : 9.6.5
@sequelize/core
express
cors
typescript
@types/express
@types/node
dotenv
ts-node
jsonwebtoken
@types/jsonwebtoken
nodemon ts-node // auto refresh with nodemon
