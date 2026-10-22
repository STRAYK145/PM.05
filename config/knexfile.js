module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'pena1488',
        database: 'pm5_shop',
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};
