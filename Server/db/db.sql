CREATE TABLE emotions (
    serial INT NOT NULL PRIMARY KEY,
    emotion VARCHAR(15) NOT NULL
);

CREATE TABLE duas (
    serial INT NOT NULL PRIMARY KEY,
    duaid INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    arabic VARCHAR(400) NOT NULL,
    pronunciation VARCHAR(400) NOT NULL,
    translation VARCHAR(400) NOT NULL,
    emotion VARCHAR(20) NOT NULL,
    favouriteCount INT NOT NULL 
);

CREATE TABLE myday(
		ID SERIAL NOT NULL PRIMARY KEY,
		userID VARCHAR NOT NULL,
		task VARCHAR(100),
		isRecurred BOOLEAN DEFAULT false,
		isCompleted BOOLEAN DEFAULT false,
		day DATE DEFAULT CURRENT_DATE 
);

CREATE TABLE users(
    userID VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    madhab VARCHAR(10) CHECK (madhab in ('Hanafi', 'Maliki', 'Shafi', 'Hanbali')),
    country VARCHAR,
    city VARCHAR
);

CREATE TABLE plannedtask(
    ID SERIAL NOT NULL PRIMARY KEY,
    userID VARCHAR NOT NULL,
    task VARCHAR(100),
    isCompleted BOOLEAN DEFAULT false,
    isAddedToMyday BOOLEAN DEFAULT false,
    day DATE DEFAULT CURRENT_DATE 
);

CREATE TABLE mysawm(
        ID SERIAL NOT NULL PRIMARY KEY,
        userID VARCHAR NOT NULL,
        sawmdate DATE NOT NULL,
        sawmreason VARCHAR NOT NULL,
        day DATE DEFAULT CURRENT_DATE 
);
