exports.up = (pgm) => {
  pgm.sql("CREATE TABLE salary_changes (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  operation_id UUID NOT NULL REFERENCES hr_operations(id),\r\n  old_salary NUMERIC,\r\n  new_salary NUMERIC NOT NULL,\r\n  reason TEXT,\r\n  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS salary_changes;");
};