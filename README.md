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

https://stackblitz.com/edit/sqlite3-persist-0?file=index.js

# Libraries

@sqlite3 : 9.6.5
@sequelize/core
express

# Examples how to make it work

https://dev.to/getaclue/how-to-install-sequelize-in-expressjs-app-with-sqlite-4p63

https://stackblitz.com/edit/sqlite3-persist-pndsnw?file=read.js
https://stackblitz.com/edit/sqlite3-persist-0?file=index.js
https://www.codeease.net/programming/javascript/using-sequelize-to-read-from-a-table
https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql#step-3-using-sequelize-for-database-queries
https://sequelize.org/docs/v6/core-concepts/model-instances/
https://www.shanegibney.com/shanegibney/sequelize-orm-with-express-basics/
https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/
