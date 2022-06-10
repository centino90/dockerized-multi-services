import { VEHICLE_CONSTANTS } from '../constants/vehicles';
import { postgres } from '../postgres';
import { getVehicle, createVehicle, getAllVehicles } from '../models/vehicles';
import uuid from 'uuid/v4';

const invalid_vehicle_type = {
    status: 400,
    body: {
        message: "Invalid Vehicle Type"
    }
}

export function routes(router) {
    router
        .post('/vehicle', async (ctx) => {
            if(!ctx.request.body.vehicle_type &&
                !Object.keys(VEHICLE_CONSTANTS).includes(ctx.request.body_vehicle_type)) {
                    Object.assign(ctx, invalid_vehicle_type)
                    return
            }

            const data = {
                ...ctx.request.body,
                ...VEHICLE_CONSTANTS[ctx.request.body.vehicle_type],
                plate_number: uuid(),
                created_at: new Date().getTime(),
                updated_at: new Date().getTime()
            }

            const create = await createVehicle(postgres(ctx), data)

            ctx.status = 200
            ctx.body = {
                id: create
            }
        })
        .get('/vehicle/:id', async (ctx) => {
            const vehicle_id = parseInt(ctx.params.id)
            const vehicle = await getVehicle(postgres(ctx), vehicle_id)

            if(!vehicle) {
                ctx.status = 404
                ctx.body = {
                    message: "Not Found"
                }
                // add return
            }

            ctx.status = 200
            ctx.body = {
                ...vehicle
            }
        })
        .get('/vehicle', async ctx => {
            const vehicles = await getAllVehicles(postgres(ctx))
            ctx.status = 200
            ctx.body = vehicles
        })
}