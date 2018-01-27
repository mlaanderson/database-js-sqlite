# database-js-sqlite
[![Build Status](https://travis-ci.org/mlaanderson/database-js-sqlite.svg?branch=master)](https://travis-ci.org/mlaanderson/database-js-sqlite)

SQLite wrapper for database-js
## About
Database-js-mysql is a wrapper around the [sql.js](https://github.com/kripken/sql.js) package by lovasoa. It is intended to be used with the [database-js](https://github.com/mlaanderson/database-js) package. 
## Usage
~~~~
var Database = require('database-js2').Connection;

(async () => {
    let connection, statement, rows;
    connection = new Database('database-js-sqlite:///test.sqlite');
    
    try {
        statement = await connection.prepareStatement("SELECT * FROM tablea WHERE user_name = ?");
        rows = await statement.query('not_so_secret_user');
        console.log(rows);
    } catch (error) {
        console.log(error);
    } finally {
        await connection.close();
    }
})();
~~~~