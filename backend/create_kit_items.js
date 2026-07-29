import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'appcardapio',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log('Criando tabela product_kit_items...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_kit_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kit_id VARCHAR(50) NOT NULL,
        product_id VARCHAR(50) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        FOREIGN KEY (kit_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    console.log('Tabela product_kit_items criada com sucesso!');
  } catch (err) {
    console.error('Erro:', err);
  } finally {
    process.exit(0);
  }
}

run();
