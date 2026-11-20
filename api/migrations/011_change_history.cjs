exports.up = (pgm) => {
  pgm.sql("CREATE TABLE change_history (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  user_id UUID,\r\n  entity_type VARCHAR NOT NULL,\r\n  entity_id UUID NOT NULL,\r\n  field_name VARCHAR NOT NULL,\r\n  old_value TEXT,\r\n  new_value TEXT,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS change_history;");
};