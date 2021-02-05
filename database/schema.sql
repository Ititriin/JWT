CREATE TABLE IF NOT EXISTS users (
	id integer NOT NULL PRIMARY KEY,
	username text NOT NULL UNIQUE,
    password text NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);