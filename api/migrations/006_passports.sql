
-- migrate:up

CREATE TABLE passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE REFERENCES employees(id),
  series CHAR(4) NOT NULL,
  number CHAR(6) NOT NULL,
  issued_by TEXT NOT NULL,
  issued_at DATE NOT NULL,
  division_code CHAR(7) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
