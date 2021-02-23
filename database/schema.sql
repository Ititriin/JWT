CREATE TABLE IF NOT EXISTS users (
	id integer NOT NULL PRIMARY KEY,
	username text NOT NULL UNIQUE,
    password text NOT NULL,
    email text NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    createdDate date NOT NULL
);