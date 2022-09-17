import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_USER,
    ENV,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
} = process.env;

const Client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default Client;
