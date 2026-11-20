exports.up = (pgm) => {
  pgm.sql("CREATE TABLE hr_operations (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  employee_id UUID NOT NULL REFERENCES employees(id),\r\n  department_id UUID NOT NULL REFERENCES departments(id),\r\n  position_id UUID NOT NULL REFERENCES positions(id),\r\n  type VARCHAR NOT NULL CHECK (type IN (\u0027hire\u0027, \u0027fire\u0027, \u0027change\u0027)),\r\n  created_by UUID,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS hr_operations;");
};