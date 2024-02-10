import express from 'express';
import mysql from 'mysql2';
import cors from "cors"

const app = express();
const port = 3001; // Choose a port for your backend

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'eduardomondello',
  password: 'Q,@r}Xc=v4jV3}7',
  database: 'Mondello',
}).promise()
app.use(cors());
app.get('/getData/:id', async (req, res) => {

  try {
    let query = 'SELECT * FROM personas';

    const result = await pool.query(query);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getBarrioData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM barrio');
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});