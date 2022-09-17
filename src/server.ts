import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes_products from './handlers/products';

const app: express.Application = express();
const address = '0.0.0.0:4000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

// Insert app routes here
routes_products(app);


app.listen(4000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
