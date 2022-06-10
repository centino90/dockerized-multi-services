CREATE DATABASE vehicles;

\connect vehicles;

CREATE TABLE vehicles (
    id BIGSERIAL PRIMARY KEY,
    created_at BIGINT,
    updated_at BIGINT,
    deleted BOOLEAN,
    vehicle_type TEXT,
    vehicle_name TEXT,
    color TEXT,
    plate_number TEXT,
    wheels INTEGER,
    engine TEXT
)