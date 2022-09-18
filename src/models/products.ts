import Client from '../database';

export type Products = {
    id?: number;
    name: string;
    description: string;
    image: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Products[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async add(product: Products): Promise<Products> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO products(name, description, image, price) VALUES($1, $2, $3, $4) RETURNING *;';
            const result = await conn.query(sql, [
                product.name as string,
                product.description as string,
                product.image as string,
                product.price as number,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
