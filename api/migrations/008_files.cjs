exports.up = (pgm) => {
  pgm.sql("CREATE TABLE files (\r\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\r\n  employee_id UUID NOT NULL REFERENCES employees(id),\r\n  category_id UUID NOT NULL REFERENCES file_categories(id),\r\n  name VARCHAR NOT NULL,\r\n  storage_path TEXT NOT NULL,\r\n  mime_type VARCHAR NOT NULL,\r\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),\r\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()\r\n);");
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE IF EXISTS files;");
};