const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Разрешённые варианты сортировки (из адреса в SQL ничего напрямую не подставляется)
const SORTS = {
    year:  { column: 'year',  direction: 'desc' }, // сначала новые по году производства
    name:  { column: 'name',  direction: 'asc' },  // по алфавиту
    price: { column: 'price', direction: 'asc' },  // от дешёвых к дорогим
};

router.get('/catalog', async (req, res) => {
    try {
        const sort = SORTS[req.query.sort] ? req.query.sort : '';
        const categoryId = Number(req.query.category) || null;

        const query = db('products')
            .select('id', 'name', 'price', 'image')
            .where('quantity', '>', 0); // только товары в наличии

        if (categoryId) {
            query.andWhere('category_id', categoryId);
        }

        if (sort) {
            query.orderBy(SORTS[sort].column, SORTS[sort].direction);
        } else {
            query.orderBy('created_at', 'desc'); // по умолчанию от новых к старым
        }
        query.orderBy('id', 'desc'); // запасная сортировка, чтобы порядок не «прыгал»

        const [products, categories] = await Promise.all([
            query,
            db('categories').orderBy('id'),
        ]);

        res.render('catalog', {
            products,
            categories,
            selectedCategory: categoryId,
            selectedSort: sort,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;