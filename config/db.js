import { Pool } from 'pg'

const connectionString = 'postgresql://neondb_owner:npg_vAbJOjhu0N2E@ep-calm-union-a18gafgs-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const pool = new Pool({
    connectionString: connectionString
})
export default pool;