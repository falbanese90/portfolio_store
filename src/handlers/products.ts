import { Products, ProductStore } from '../models/products';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/authenticate';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const store = new ProductStore();
        const response = await store.index();
        res.send(response);
    } catch (err) {
        res.send(`${err}`);
    }
};

const add = async (req: Request, res: Response) => {
    // try {
    //     const authoricationHeader = req.headers.authorization;
    //     const token = authoricationHeader?.split(' ')[1];
    //     jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    // } catch (err) {
    //     res.status(401);
    //     res.json('Access denied, invalid token');
    //     return
    // }
    try {
        const product: Products = {
            name: String(req.body.name),
            description: String(req.body.description),
            image: String(req.body.image),
            price: Number(req.body.price),
        };
        const response = await store.add(product);
        res.send(response);
    } catch (err) {
        res.send(err);
    }
};

const routes_products = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products/add', verifyAuthToken, add);
};

export default routes_products;
