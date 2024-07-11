import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'shopping_list',
  password: 'password',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/api/items', async (req, res) => {
  try {
    const items = await pool.query('SELECT * FROM items');
    res.json(items.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const newItem = await pool.query(
      'INSERT INTO items (name, description, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, description, quantity]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity } = req.body;
    const updateItem = await pool.query(
      'UPDATE items SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, description, quantity, id]
    );
    res.json(updateItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
