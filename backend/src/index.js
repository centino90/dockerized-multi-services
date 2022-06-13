import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router'
import logger from 'koa-logger'
import * as swagger from 'swagger2'
import cors from '@koa/cors'

import {
    validate as swaggerValidate,
    ui as swaggerUI
} from 'swagger2-koa'

import { postgresMiddleware } from './postgres.js'
import {routes as vehicleRoutes} from './routes/vehicles.js'

const origin = "*"

const app = new Koa()

const spec = swagger.loadDocumentSync('./src/swagger.yaml')
spec.host = 'localhost:9000'

if(!swagger.validateDocument(spec)) {
    throw Error('./swagger.yml does not conform to the swagger 2')
}

app.use(postgresMiddleware())
app.use(cors({origin: origin}, spec))
app.use(bodyParser())
app.use(logger())

const router = new Router({prefix: '/v1'})

vehicleRoutes(router)

app.use(swaggerValidate(spec))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(swaggerUI(spec, '/', ['/v1']))

app.listen(9000, console.log('Backend is running at 9000'))