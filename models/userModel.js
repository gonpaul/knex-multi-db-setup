// import knex from "../db-connection.js";
const knex = require("../db-connection.js");

class UserModel {
    async register(name, email, password) {
        try {
            console.log('Method: register');
            await knex('users').insert({ name, email, password });
            // returns id as [ 1 ] in sqlite, and an object with metadata in postgres
            const id = (await knex('users')).at('-1').id; 
            console.log('Result: ', id);
            return id;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    }

    async login(email, password) {
        try {
            console.log('Method: login');
            const user = await knex('users').select('*').where({ email }).first();
            console.log('Result: ', user);
            if (user && user.password === password) {
                return user; // Returns the user object if found
            }
            return false;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    }

    async updatePassword(email, newPassword) {
        try {
            console.log('Method: updatePassword');
            const result = await knex('users').where({ email }).update({ password: newPassword });
            console.log('Result: ', result);
            return result; // Returns a boolean indicating success
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    }

    async delete(email) {
        try {
            console.log('Method: delete');
            const result = await knex('users').where({ email }).delete();
            console.log('Result: ', result);
            return result; // Returns a boolean indicating success
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    }
}

module.exports = UserModel;