exports.up = (pgm) => {
  pgm.sql("CREATE TABLE addresses (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  employee_id UUID NOT NULL UNIQUE REFERENCES employees(id),\r\n  region VARCHAR NOT NULL,\r\n  city VARCHAR NOT NULL,\r\n  street VARCHAR,\r\n  house VARCHAR,\r\n  building VARCHAR,\r\n  apartment VARCHAR,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS addresses;");
};