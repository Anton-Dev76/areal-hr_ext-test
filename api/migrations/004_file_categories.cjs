exports.up = (pgm) => {
  pgm.sql("CREATE TABLE file_categories (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  name VARCHAR NOT NULL UNIQUE,\r\n  comment TEXT,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  deleted_at TIMESTAMPTZ\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS file_categories;");
};