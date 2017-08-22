var Database = require('database-js2').Connection;

(async function () {
    let connection = new Database("database-js-sqlite:///test.sqlite", require('.'));
    let statement = connection.prepareStatement('SELECT * FROM states WHERE State = ?');
    let results;

    try {
        results = await statement.query('South Dakota');
        console.log(results);
    } catch (err) {
        console.log(err);
    } finally {
        await connection.close();
        process.exit(0);
    }
})();