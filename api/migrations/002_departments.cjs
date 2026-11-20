exports.up = (pgm) => {
  pgm.sql("CREATE TABLE departments (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  name VARCHAR NOT NULL,\r\n  comment VARCHAR,\r\n  organization_id UUID NOT NULL REFERENCES organizations(id),\r\n  parent_id UUID REFERENCES departments(id),\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  deleted_at TIMESTAMPTZ\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS departments;");
};