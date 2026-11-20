exports.up = (pgm) => {
  pgm.sql("CREATE TABLE passports (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  employee_id UUID NOT NULL UNIQUE REFERENCES employees(id),\r\n  series CHAR(4) NOT NULL,\r\n  number CHAR(6) NOT NULL,\r\n  issued_by TEXT NOT NULL,\r\n  issued_at DATE NOT NULL,\r\n  division_code CHAR(7) NOT NULL,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS passports;");
};