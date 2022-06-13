import PgAsync from 'pg-async'

export function postgresMiddleware() {
    const pg = new PgAsync({connectionString: 'postgres://amagi:password@postgres:5432/vehicles'})
    
    return async (ctx, next) => {
        ctx._postgres = pg
        return await next()
    }
}

export function postgres(ctx) {
    return ctx._postgres
}