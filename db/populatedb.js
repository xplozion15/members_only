const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const SQL = `

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255),
  email VARCHAR (255),
  password VARCHAR (255),
  is_member BOOL DEFAULT FALSE,
  is_admin BOOL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  text VARCHAR (255),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username,email,password)
    VALUES
        ('xplozion','xplozion@gmail.com','xplozionpass'),
        ('hal','hal@gmail.com','halpass'),
        ('lune','lune@gmail.com','lunepass');

INSERT INTO letters (text,user_id) 
    VALUES 
        ('hi im new here lol',1)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
