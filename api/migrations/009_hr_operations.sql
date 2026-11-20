
-- migrate:up

CREATE TABLE hr_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  department_id UUID NOT NULL REFERENCES departments(id),
  position_id UUID NOT NULL REFERENCES positions(id),
  type VARCHAR NOT NULL CHECK (type IN ('hire', 'fire', 'change')),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
