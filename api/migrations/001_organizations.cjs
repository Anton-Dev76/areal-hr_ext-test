exports.up = (pgm) => {
  pgm.sql("CREATE TABLE organizations (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  name VARCHAR NOT NULL,\r\n  comment VARCHAR,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  deleted_at TIMESTAMPTZ\r\n);\r\n\r\nCREATE UNIQUE INDEX organizations_name_unique\r\n  ON organizations (name)\r\n  WHERE deleted_at IS NULL;");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS organizations;");
};