import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';
import * as swagger from 'swagger2';
import cors from '@koa/cors';
import { validate as swaggerValidate, ui as swaggerUI } from 'swagger2-koa';

import { routes as carRoutes } from './routes/car.js';
import { routes as motorcycleRoutes } from './routes/motorcycle.js';

const origin = '*';
const app = new Koa();
const router = new Router({ prefix: '/v1' });

const spec = swagger.loadDocumentSync('./src/swagger.yaml');

if (!swagger.validateDocument(spec)) {
  throw Error('./swagger.yaml does not conform to the swagger 2.');
}

app.use(cors({origin: origin}, spec))
app.use(bodyParser())
app.use(logger())

for (const route of [
    carRoutes,
    motorcycleRoutes
]) {
    route(router)
}

router.get('/swagger.json', ctx => {
    ctx.status = 200
    ctx.body = spec
})

app.use(swaggerValidate(spec))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(swaggerUI(spec, '/', ['/v1']))

app.listen(9001, console.log('Middleware is running at 9001'))
