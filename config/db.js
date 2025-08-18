import { Pool } from 'pg'

const connectionString = process.env.DB;
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})
export default pool;