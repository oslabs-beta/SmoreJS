// connecting server to database
const { Pool } = require('pg');

const PG_URI = 'postgres://nhrpnwry:4p7qJCYXNHtfNzrKH6jJRDYM8MP9u20C@kashin.db.elephantsql.com/nhrpnwry'

const pool = new Pool({
  connectionString: PG_URI,
})

module.exports = {
  query: (text: any, params: any, callback: any) => {
    console.log('query executed ', text);
    return pool.query(text, params, callback);
  }
}
