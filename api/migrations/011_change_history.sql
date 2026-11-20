
-- migrate:up

CREATE TABLE change_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  entity_type VARCHAR NOT NULL,
  entity_id UUID NOT NULL,
  field_name VARCHAR NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
