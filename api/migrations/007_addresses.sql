
-- migrate:up

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE REFERENCES employees(id),
  region VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  street VARCHAR,
  house VARCHAR,
  building VARCHAR,
  apartment VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
