Usage
---------
- Copy .env with your credentials
- npm install
- npm run migrate
- npm start

This will pick SQLite in development (NODE_ENV=development) and PostgreSQL in production (NODE_ENV=production).


## Useful commands

```bash
npx knex migrate:make create_users_table
```


## PSQL related

### install package
```bash
sudo pacman -S postgresql
```

### Start the process
```bash
sudo systemctl start postgresql
```

### Switch to postgres user
```bash
su postgres
```


### Initialize the database system, if it's not initialized
```bash
sudo initdb -D /var/lib/postgres/data
```

### Create a new database
```bash
# option 1 - using createdb tool
createdb <newDatabaseName>

# option 2 - use psql
psql
CREATE DATABASE <NAME>
```

### In psql
```bash
# list available databases
\l 

# connect to a database
\c <name>
# show summary about tables in a certain database
\dt
```
