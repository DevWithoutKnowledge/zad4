module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'abraxsas',
      password: 'toor',
      database: 'zad4_db',
      port: 5432
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
}
