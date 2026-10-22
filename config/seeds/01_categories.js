exports.seed = async (knex) => {
    await knex.raw('TRUNCATE products, categories RESTART IDENTITY CASCADE');

    await knex('categories').insert([
        { name: 'Лазерные принтеры' },
        { name: 'Струйные принтеры' },
        { name: 'Термопринтеры' },
    ]);
};