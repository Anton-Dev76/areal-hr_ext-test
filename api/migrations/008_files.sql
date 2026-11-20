
-- migrate:up

CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  category_id UUID NOT NULL REFERENCES file_categories(id),
  name VARCHAR NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
