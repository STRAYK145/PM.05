exports.seed = async (knex) => {
    const categories = await knex('categories');
    const cat = (name) => categories.find((c) => c.name === name).id;

    await knex('products').insert([
        {
            name: 'HP LaserJet Pro M15a',
            price: 11990, year: 2021, country: 'Китай', model: 'M15a',
            image: 'hp-m15a.jpg', quantity: 8,
            category_id: cat('Лазерные принтеры'),
            created_at: '2026-09-01 10:00:00',
        },
        {
            name: 'Brother HL-L2300DR',
            price: 14990, year: 2022, country: 'Вьетнам', model: 'HL-L2300DR',
            image: 'brother-hl-l2300dr.jpg', quantity: 5,
            category_id: cat('Лазерные принтеры'),
            created_at: '2026-09-05 10:00:00',
        },
        {
            name: 'Canon i-SENSYS LBP6030',
            price: 9990, year: 2020, country: 'Япония', model: 'LBP6030',
            image: 'canon-lbp6030.jpg', quantity: 12,
            category_id: cat('Лазерные принтеры'),
            created_at: '2026-09-10 10:00:00',
        },
        {
            name: 'Epson L3250',
            price: 17990, year: 2023, country: 'Индонезия', model: 'L3250',
            image: 'epson-l3250.jpg', quantity: 6,
            category_id: cat('Струйные принтеры'),
            created_at: '2026-09-15 10:00:00',
        },
        {
            name: 'Canon PIXMA G3410',
            price: 15990, year: 2022, country: 'Вьетнам', model: 'G3410',
            image: 'canon-g3410.jpg', quantity: 4,
            category_id: cat('Струйные принтеры'),
            created_at: '2026-09-20 10:00:00',
        },
        {
            name: 'HP DeskJet Ink Advantage 2720',
            price: 6490, year: 2019, country: 'Малайзия', model: '2720',
            image: 'hp-2720.jpg', quantity: 0, // нет в наличии, в каталоге не показывается
            category_id: cat('Струйные принтеры'),
            created_at: '2026-09-25 10:00:00',
        },
        {
            name: 'Xprinter XP-365B',
            price: 7990, year: 2023, country: 'Китай', model: 'XP-365B',
            image: 'xprinter-xp365b.jpg', quantity: 15,
            category_id: cat('Термопринтеры'),
            created_at: '2026-10-01 10:00:00',
        },
        {
            name: 'Zebra ZD220',
            price: 18990, year: 2024, country: 'Китай', model: 'ZD220',
            image: 'zebra-zd220.jpg', quantity: 3,
            category_id: cat('Термопринтеры'),
            created_at: '2026-10-05 10:00:00',
        },
        {
            name: 'Brother QL-800',
            price: 21990, year: 2021, country: 'Вьетнам', model: 'QL-800',
            image: 'brother-ql800.jpg', quantity: 2,
            category_id: cat('Термопринтеры'),
            created_at: '2026-10-10 10:00:00',
        },
    ]);
};