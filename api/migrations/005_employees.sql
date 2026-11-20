
-- migrate:up

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  last_name VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  middle_name VARCHAR,
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
