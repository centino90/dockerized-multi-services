export async function createVehicle(pg, data) {
  const deleted = false;

  const {
    created_at,
    updated_at,
    vehicle_type,
    vehicle_name,
    color,
    plate_number,
    wheels,
    engine,
  } = data;

  const created = await pg('vehicles').insert(
    {
        created_at,
        updated_at,
        deleted,
        vehicle_type,
        vehicle_name,
        color,
        plate_number,
        wheels,
        engine
    },
    ['id']
  )

  return created
}

export async function getVehicle(pg, id) {
    const vehicle = await pg.select('*').from('vehicles').where({ id: id });

    if(!vehicle[0]) {
        return null
    }

    return vehicle[0];
}

export async function getAllVehicles(pg) {
    const vehicles = await pg.select('*').from('vehicles');

    return vehicles
}