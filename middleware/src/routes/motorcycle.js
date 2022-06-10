import axios from 'axios';
import { VEHICLE_TYPE_MOTORCYCLE } from '../constants/vehicle_types';

export const routes = (router) => {
  router
    .post('/motorcycle', async (ctx) => {
        const payload = Object.assign({}, {
            vehicle_name: ctx.request.body.name,
            color: ctx.request.body.color,
            vehicle_type: VEHICLE_TYPE_MOTORCYCLE
        })

        const uri = "http://backend:9000/v1/vehicle"
        const response = await axios.post(uri, payload)

        ctx.status = response.status !== 200 ? 400 : response.status
        ctx.body = response.status !== 200 ? {
            message: "Failed to reach Backend Service"
        } : response.data
     })
    .get('/motorcycle', async (ctx) => {
        const uri = "http://backend:9000/v1/vehicle"
        const response = await axios.get(uri)

        ctx.status = 200;

        ctx.body = response.data.reduce((accu, current) => {
            if(current.vehicle_type && current.vehicle_type === VEHICLE_TYPE_MOTORCYCLE && current !== undefined) {
                accu.push(current)
            }
            return accu
        }, [])
     })
};
