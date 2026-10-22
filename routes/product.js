const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/product/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        // Некорректный id в адресе (например, /product/abc)
        if (!Number.isInteger(id) || id < 1) {
            return res.status(404).send('Товар не найден');
        }

        const product = await db('products')
            .where({ id })
            .andWhere('quantity', '>', 0) // товары не в наличии не показываем
            .first();

        if (!product) {
            return res.status(404).send('Товар не найден');
        }

        res.render('product', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;