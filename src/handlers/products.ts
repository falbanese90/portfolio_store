import { Products, ProductStore } from "../models/products";
import express, { Request, Response } from 'express';

const store = new ProductStore();

const add = async(req: Request, res: Response) => {
    try {
        const product: Products = {
            name: String(req.body.name),
            description: String(req.body.description),
            image: String(req.body.image),
            price: Number(req.body.price)
        };
        const response = await store.add(product);
        res.send(response);
    } catch (err) {
        res.send(err);
    }
}

const routes_products = (app: express.Application) => {
    app.post('/products/add', add);
}

export default routes_products;