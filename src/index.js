import pool from '../config/db.js';
import { ExpressPlus } from '@thong190103/expressplus';

const app = new ExpressPlus();

/*CREATE TABLE home (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    content TEXT
);
*/

app.get('/api/contact', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM home');
        res.json({
            payload: result.rows,
            success: true,
            message: 'Fetched all home'
        });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/api/contact", async (req, res) => {
    try {
        const { email, content } = req.body || {};

        if (!email || !content) {
            res.status(400).json({ error: "Email and content are required" });
            return;
        }

        const result = await pool.query(
            "INSERT INTO home (email, content) VALUES ($1, $2) RETURNING *",
            [email, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put('/api/contact/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        const { email, content } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email is required'
            });
        }

        const result = await client.query(
            'UPDATE home SET email = $1, content = $2 WHERE id = $3 RETURNING *',
            [email, content, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Not Found'
            });
        } else {
            res.json({
                payload: result.rows[0],
                success: true,
                message: `Updated row: ${result.rows[0].id}`,
            });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    } finally {
        client.release();
    }
});

app.delete('/api/contact/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM home WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Not Found'
            });
        } else {
            res.json({
                payload: result.rows[0],
                success: true,
                message: `Deleted row: ${result.rows[0].id}`,
            });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    } finally {
        client.release();
    }
});

app.patch('/api/contact/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        const { email, content } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email is required'
            });
        }

        const result = await client.query(
            'UPDATE home SET email = $1, content = $2 WHERE id = $3 RETURNING *',
            [email, content, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Not Found'
            });
        } else {
            res.json({
                payload: result.rows[0],
                success: true,
                message: `Updated row: ${result.rows[0].id}`,
            });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    } finally {
        client.release();
    }
});

app.listen(3001, () => {
    console.log('🚀 Server is running on port 3001');
});