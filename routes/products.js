const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

// Crear producto
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO products (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, precio, stock || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    try {
        const result = await pool.query(
            'UPDATE products SET nombre = $1, descripcion = $2, precio = $3, stock = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [nombre, descripcion, precio, stock, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
