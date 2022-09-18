import { User, UserStore } from "../models/users";
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const store = new UserStore();

const create = async(req: Request, res: Response) => {
    const user: User = {
        username: String(req.body.username),
        password: String(req.body.password)
    }
    try {
        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET as string, { expiresIn: '1h'});
        res.json(token);
    } catch (err) {
        res.status(400);
        res.send(`${err}`);
    }
}

const authenticate = async(req: Request, res: Response) => {
    const user: User = {
        username: String(req.body.username),
        password: String(req.body.password)
    }
    try {
        const u = await store.authenticate(user.username, user.password);
        if (u == null) {
            res.status(401);
            res.send('Username and/or password not correct..')
            return
        }
        var token = jwt.sign({user: u}, process.env.TOKEN_SECRET as string, { expiresIn: '1h'});
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json({ err });
    }
}

const routes_users = async(app: express.Application) => {
    app.post('/users/add', create);
    app.post('/users/authenticate', authenticate);
}

export default routes_users;