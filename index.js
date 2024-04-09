import cors from 'cors'
import express from "express"
const app = express();
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const db = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    connectionString: process.env.POSTGRES_URL ,
})

app.use( express.json() )

const options = [
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
];

app.use(options)

app.listen(
    process.env.PORT,
    () => {
        console.log(`ALIVEEE on http://localhost:${process.env.PORT}`)
    }
)

// GET tree by ID
app.get('/tree/:id', async (req, res) => {
    const { id } = req.params
    const client = await db.connect();

    const result = await client.query(```
        SELECT *
        FROM trees
        WHERE tree_id='${id}'
    ```);
    client.release()

    res.status(200).json(result.rows)
});

// GET all trees in the "trees" table
app.get('all_trees', async (req, res) => {
    const client = await db.connect();

    const result = await client.query(```
        SELECT *
        FROM trees
    ```);
    client.release()

    res.status(200).json(result.rows)
});

// POST a tree to the database
app.post('/tree', async (req, res) => {
    const { tree } = req.body
    const client = await db.connect();

    const result = await client.query(```
        insert into trees(
            tree_id,
            name,
            lat,
            long,
            reg_date_time
        )
        values(
            uuid_generate_v4(),
            '${tree.name}',
            ${tree.lat},
            ${tree.long},
            '${tree.reg_date_time}'
        )
    ```);
    client.release()

    res.status(200).json(result)
});
