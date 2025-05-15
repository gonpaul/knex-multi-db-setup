const dotenv = require('dotenv');
const knexConfig = require('./knexfile.js');
const knex = require('knex');

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const Knex = knex(knexConfig[env]);

console.log(`Running in ${env} mode`);

// Run migrations
// await Knex.migrate.latest();

async function main() {
  try {
    console.log(`Running in ${env} mode`);
    // Run migrations
    await Knex.migrate.latest();

    // Insert a new user
    const result = await Knex('users').insert({ name: 'bob', email: 'bob3@example.com' });
    console.log(result); // returns id as [ 1 ] in sqlite, and an object with metadata in postgres
    console.log((await Knex('users')).at(-1)) // user row in sqlite and postgresql 

    // const id = Array.isArray(result) ? result[0] : null; // Check if result is an array
    // if (id) {
    //   console.log('Inserted user with ID:', id);
    // } else {
    //   console.log('Insert failed or returned no ID');
    // }

    // Fetch all users
    const users = await Knex('users').select('*');
    console.table(users);

    // update user's name
    const updateResult = await Knex('users').where('email', 'bob3@example.com').update({
        name: 'bobby'
    });
    console.log("updateResult: ", updateResult); // boolean in both systems

    // select the user
    const selectedUser = await Knex.select('*').from('users').where("email", "bob3@example.com");
    console.log("selectedUser: ", selectedUser); // a user list of user rows in sqlite and postgresql

    // delete the user
    const deleteResult = await Knex('users').where('email', 'bob3@example.com').delete();
    console.log(deleteResult); // seems to return a boolean for both systems


    // await Knex('cars').insert({ model: 'M5', brand: 'BMW' });
    const cars = await Knex('cars').select('*');
    console.table(cars);
  } catch (err) {
    console.error(err);
  } finally {
    await Knex.destroy();
  }
}

// main();

module.exports = Knex;