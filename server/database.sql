create TABLE personbases(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    secondName VARCHAR(255),
    birthday date,
    email VARCHAR(255),
    passwords VARCHAR(255),
    phone bigint,
    coin bigint
);
create TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    secondName VARCHAR(255),
    birthday date,
    email VARCHAR(255),
    phone int,
    coin int
);