exports.up = async (knex) => {
    await knex.schema.createTable('roles', (t) => {
        t.increments('id');
        t.string('name').notNullable().unique();
    });

    await knex.schema.createTable('users', (t) => {
        t.increments('id');
        t.string('name').notNullable();
        t.string('surname').notNullable();
        t.string('patronymic');
        t.string('login').notNullable().unique();
        t.string('email').notNullable().unique();
        t.string('password').notNullable(); // хеш
        t.integer('role_id').unsigned().notNullable().references('id').inTable('roles');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('categories', (t) => {
        t.increments('id');
        t.string('name').notNullable().unique();
    });

    await knex.schema.createTable('products', (t) => {
        t.increments('id');
        t.string('name').notNullable();
        t.integer('price').notNullable();
        t.integer('year').notNullable();
        t.string('country').notNullable();
        t.string('model').notNullable();
        t.string('image');
        t.integer('quantity').notNullable().defaultTo(0);
        t.integer('category_id').unsigned().notNullable().references('id').inTable('categories');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('cart_items', (t) => {
        t.increments('id');
        t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        t.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
        t.integer('quantity').notNullable().defaultTo(1);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.unique(['user_id', 'product_id']);
    });

    await knex.schema.createTable('orders', (t) => {
        t.increments('id');
        t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        t.string('status').notNullable().defaultTo('new'); // new, confirmed, cancelled
        t.text('cancel_reason');
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('orders_items', (t) => {
        t.increments('id');
        t.integer('order_id').unsigned().notNullable().references('id').inTable('orders').onDelete('CASCADE');
        t.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        t.integer('quantity').notNullable();
        t.integer('price_at_purchase').notNullable();
    });
};

exports.down = async (knex) => {
    // удаляем в обратном порядке
    await knex.schema.dropTableIfExists('orders_items');
    await knex.schema.dropTableIfExists('orders');
    await knex.schema.dropTableIfExists('cart_items');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('roles');
};