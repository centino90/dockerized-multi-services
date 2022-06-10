import Koa from 'koa'
import bodyParser from 'body-parser'
import Router from 'koa-router'
import logger from 'koa-logger'
import * as swagger from 'swagger2'
import cors from '@koa/cors'

import {
    validate as swaggerValidate,
    ui as swaggerUI
} from 'swagger2-koa'
import { postgresMiddleware } from './postgres'

import {routes as vehicleRoutes} from './routes/vehicles'

const origin = "*"

const app = new Koa()

const spec = swagger.loadDocumentSync('./src/swagger.yml')
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

router.get('/swagger.json', async ctx => {
    ctx.status = 200
    ctx.body = spec
})

app.use(router.routes())
app.use(swaggerUI(spec, '/', ['/v1']))
app.use(router.allowedMethods())

app.listen(9000, console.log('Backend is running at 9000'))