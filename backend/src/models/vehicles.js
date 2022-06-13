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

  const created = await pg.value(
      `INSERT 
      INTO vehicles (created_at, updated_at, deleted, vehicle_type, vehicle_name, color, plate_number, wheels, engine)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      created_at,
      updated_at,
      deleted,
      vehicle_type,
      vehicle_name,
      color,
      plate_number,
      wheels,
      engine
  )

  return created
}

export async function getVehicle(pg, id) {
    const vehicle = await pg.rows(
        `SELECT * FROM vehicles WHERE id = $1`, id
    )

    if(!vehicle[0]) {
        return null
    }

    return vehicle[0]
}

export async function getAllVehicles(pg) {
    const vehicles = await pg.rows(`SELECT * FROM vehicles`)

    return vehicles
}