exports.up = (pgm) => {
  pgm.sql("CREATE TABLE employees (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  last_name VARCHAR NOT NULL,\r\n  first_name VARCHAR NOT NULL,\r\n  middle_name VARCHAR,\r\n  birth_date DATE NOT NULL,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  deleted_at TIMESTAMPTZ\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS employees;");
};