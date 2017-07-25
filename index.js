var sqlite = require('sql.js');
const fs = require('fs');

var m_database = Symbol('database');
var m_filename = Symbol('filename');

class SQLite {
    constructor(database) {
        if (database) {
            this[m_filename] = database;
            if (fs.existsSync(database)) {
                this[m_database] = new sqlite.Database(fs.readFileSync(database));
            } else {
                this[m_database] = new sqlite.Database();
            }
        } else {
            this[m_database] = new sqlite.Database();
            this[m_filename] = null;
        }
    }

    query(sql) {
        var self = this;
        return new Promise((resolve, reject) => {
            let data = self[m_database].exec(sql);
            let results = [];

            if (data.length != 1) {
                reject("Invalid data returned");
                return;
            }
            data = data[0];
            for (let value of data.values) {
                let row = {};
                for (let n = 0; n < data.columns.length; n++) {
                    row[data.columns[n]] = value[n];
                }
                results.push(row);
            }
            resolve(results);
        });
    }

    execute(sql) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                self[m_database].run(sql);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    close() {
        var self = this;
        return new Promise((resolve, reject) => {
            if (self[m_filename]) {
                fs.writeFile(self[m_filename], new Buffer(self[m_database].export()), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = {
    open: function(connection) {
        return new SQLite(connection.Database);
    }
};