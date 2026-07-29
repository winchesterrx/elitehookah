import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  console.log("Conectado ao Aiven MySQL");

  try {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.query('TRUNCATE TABLE categories');
    await connection.query('TRUNCATE TABLE products');
    await connection.query('TRUNCATE TABLE addons');
    await connection.query('TRUNCATE TABLE addon_categories');

    // Categorias
    const categories = [
      { id: "essencias", name: "Essências", icon: "flame" },
      { id: "carvoes", name: "Carvões", icon: "package" },
      { id: "aluminio", name: "Papel Alumínio", icon: "disc" },
      { id: "narguiles", name: "Narguiles", icon: "coffee" },
      { id: "outros", name: "Outros", icon: "plus-circle" }
    ];

    for (const c of categories) {
      await connection.query('INSERT INTO categories (id, name, icon) VALUES (?, ?, ?)', [c.id, c.name, c.icon]);
    }

    // Addons
    await connection.query('INSERT INTO addons (id, name, price) VALUES (?, ?, ?)', ["gelo", "Gelo", 2.0]);
    await connection.query('INSERT INTO addon_categories (addon_id, category_id) VALUES (?, ?)', ["gelo", "essencias"]);
    await connection.query('INSERT INTO addon_categories (addon_id, category_id) VALUES (?, ?)', ["gelo", "outros"]);

    // Produtos
    const products = [
      { id: "1", name: "Zomo Strong Mint", description: "Menta extremamente refrescante", price: 15.0, image: "/uploads/zomo_mint.png", category_id: "essencias", brand: "Zomo", is_promo: 0, order_count: 200 },
      { id: "2", name: "Zomo Alfajor", description: "Sabor doce do famoso doce argentino", price: 15.0, image: "/uploads/zomo_alfajor.png", category_id: "essencias", brand: "Zomo", is_promo: 0, order_count: 150 },
      { id: "3", name: "Zomo Swiss Alp", description: "Chiclete de menta", price: 15.0, image: "/uploads/zomo_swiss.png", category_id: "essencias", brand: "Zomo", is_promo: 0, order_count: 180 },
      { id: "4", name: "Ziggy Happy Frut", description: "Balinha tutti-frutti", price: 18.0, image: "/uploads/ziggy_happy.png", category_id: "essencias", brand: "Ziggy", is_promo: 0, order_count: 300 },
      { id: "5", name: "Ziggy Tropical", description: "Mix de frutas tropicais", price: 18.0, image: "/uploads/ziggy_tropical.png", category_id: "essencias", brand: "Ziggy", is_promo: 1, original_price: 20.0, order_count: 250 },
      { id: "6", name: "Nay Melon Blend", description: "Melão suave", price: 17.0, image: "/uploads/nay_melon.png", category_id: "essencias", brand: "Nay", is_promo: 0, order_count: 90 },
      { id: "7", name: "Nay Strawberry", description: "Morango intenso", price: 17.0, image: "/uploads/nay_strawberry.png", category_id: "essencias", brand: "Nay", is_promo: 0, order_count: 110 },
      { id: "8", name: "Onix Grape", description: "Uva gelada", price: 16.0, image: "/uploads/onix_grape.png", category_id: "essencias", brand: "Onix", is_promo: 0, order_count: 140 },
      { id: "9", name: "Adalya Love 66", description: "Maracujá, melão, melancia e menta", price: 25.0, image: "/uploads/adalya_love.png", category_id: "essencias", brand: "Adalya", is_promo: 0, order_count: 400 },
      { id: "10", name: "Carvão Zomo 1kg", description: "Carvão de coco hexagonal", price: 35.0, image: "/uploads/carvao_zomo.png", category_id: "carvoes", brand: null, is_promo: 0, order_count: 500 },
      { id: "11", name: "Carvão Art Coco 1kg", description: "Carvão de coco tradicional", price: 38.0, image: "/uploads/carvao_art.png", category_id: "carvoes", brand: null, is_promo: 0, order_count: 450 },
      { id: "12", name: "Alumínio Predator 50 un", description: "Folhas pré-cortadas, espessura grossa", price: 15.0, image: "/uploads/alum_predator.png", category_id: "aluminio", brand: null, is_promo: 0, order_count: 300 },
      { id: "13", name: "Narguile Triton Zip", description: "Narguile pequeno completo (Cores variadas)", price: 250.0, image: "/uploads/triton.png", category_id: "narguiles", brand: null, is_promo: 0, order_count: 20 },
    ];

    for (const p of products) {
      await connection.query(
        'INSERT INTO products (id, name, description, price, image, category_id, brand, is_promo, original_price, order_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.id, p.name, p.description, p.price, p.image, p.category_id, p.brand, p.is_promo, p.original_price || null, p.order_count]
      );
    }
    
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("Seed completado com sucesso!");

  } catch (error) {
    console.error("Erro no seed:", error);
  } finally {
    await connection.end();
  }
}

seed();
