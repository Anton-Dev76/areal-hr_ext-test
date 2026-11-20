
-- migrate:up

CREATE TABLE salary_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id UUID NOT NULL REFERENCES hr_operations(id),
  old_salary NUMERIC,
  new_salary NUMERIC NOT NULL,
  reason TEXT,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
