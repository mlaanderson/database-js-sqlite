var Database = require('database-js2').Connection;

(async function () {
    var connection = new Database("database-js-sqlite:///test.sqlite");
})();