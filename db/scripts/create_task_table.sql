DROP TYPE IF EXISTS enum_tasks_status;

CREATE TYPE enum_tasks_status AS ENUM('open', 'inprogress', 'completed');

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  status enum_tasks_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (id)
);