/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg', // PostgreSQL as the database client
    connection: {
      host: '127.0.0.1', // Your local PostgreSQL instance
      user: 'postgres', // Your PostgreSQL username
      password: 'password', // Your PostgreSQL password
      database: 'capstonedatabase2', // Your PostgreSQL database name
      port: 5432, // PostgreSQL default port
    },
    pool: {
      min: 2, // Minimum number of connections in the pool
      max: 10 // Maximum number of connections in the pool
    },
    migrations: {
      directory: './migrations', // Folder where migration files are stored
      tableName: 'knex_migrations' // Table where Knex keeps track of applied migrations
    },
    seeds: {
      directory: './seeds' // Folder where seed files are stored (if needed)
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'capstonedatabase2',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'capstonedatabase2',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }

};