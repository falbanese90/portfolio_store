import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type User = {
    id?: number,
    username: string,
    password: string
};

export class UserStore {
    async create(user: User):Promise<User> {
        try {
            const hash = bcrypt.hashSync(
                user.password + process.env.PEPPER as string,
                parseInt(process.env.SALTROUNDS as string)
            );
            const conn = await Client.connect();
            const sql = 'INSERT INTO users(username, password_digest) VALUES($1, $2) RETURNING *;';
            const result = await conn.query(sql, [user.username, hash]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
    async authenticate(username: string, password: string):Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1);';
        const result = await conn.query(sql, [username]);
        conn.release();
        console.log(password+process.env.PEPPER as string);

        if (result.rows.length) {
            const user = result.rows[0];

            console.log(user);

            if (bcrypt.compareSync(password+process.env.PEPPER as string, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}