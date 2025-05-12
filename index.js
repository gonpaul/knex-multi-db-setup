// 5. index.js
// ------------
// Example script that runs a simple query

require('dotenv').config();
const knexConfig = require('./knexfile.js');
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexConfig[env]);

async function main() {
  try {
    console.log(`Running in ${env} mode`);
    // Run migrations
    await knex.migrate.latest();

    // Insert a new user
    const result = await knex('users').insert({ name: 'Alice', email: 'alice5@example.com' });
    const id = Array.isArray(result) ? result[0] : null; // Check if result is an array
    if (id) {
      console.log('Inserted user with ID:', id);
    } else {
      console.log('Insert failed or returned no ID');
    }

    // Fetch all users
    const users = await knex('users').select('*');
    console.table(users);


    await knex('cars').insert({ model: 'M5', brand: 'BMW' });
    const cars = await knex('cars').select('*');
    console.table(cars);
  } catch (err) {
    console.error(err);
  } finally {
    await knex.destroy();
  }
}

main();
