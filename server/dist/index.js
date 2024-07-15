"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'shopping_list',
    password: 'password',
    port: 5432,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield pool.query('SELECT * FROM items');
        res.json(items.rows);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching items:', err.message);
            res.status(500).json({ error: err.message });
        }
        else {
            console.error('Unexpected error:', err);
            res.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
}));
app.post('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, quantity } = req.body;
        const newItem = yield pool.query('INSERT INTO items (name, description, quantity) VALUES ($1, $2, $3) RETURNING *', [name, description, quantity]);
        res.json(newItem.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error adding item:', err.message);
            res.status(500).json({ error: err.message });
        }
        else {
            console.error('Unexpected error:', err);
            res.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
}));
app.put('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, quantity } = req.body;
        const updateItem = yield pool.query('UPDATE items SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *', [name, description, quantity, id]);
        res.json(updateItem.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error updating item:', err.message);
            res.status(500).json({ error: err.message });
        }
        else {
            console.error('Unexpected error:', err);
            res.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
}));
app.delete('/api/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield pool.query('DELETE FROM items WHERE id = $1', [id]);
        res.json({ message: 'Item deleted' });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error deleting item:', err.message);
            res.status(500).json({ error: err.message });
        }
        else {
            console.error('Unexpected error:', err);
            res.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
}));
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
