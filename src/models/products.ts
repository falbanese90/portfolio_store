import Client from "../database";

export type Products = {
    id?: Number,
    name: String,
    description: String,
    image: String,
    price: Number
};

export class ProductStore {
    async add(product: Products):Promise<Products> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products(name, description, image, price) VALUES($1, $2, $3, $4) RETURNING *;';
            const result = await conn.query(sql, [
                product.name as String,
                product.description as String,
                product.image as String,
                product.price as Number
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}