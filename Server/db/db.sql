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

CREATE TABLE tasklist(
    ID SERIAL NOT NULL PRIMARY KEY,
    userID VARCHAR NOT NULL,
    listname VARCHAR(100) 
);

CREATE TABLE tasklistcontent(
    ID SERIAL NOT NULL PRIMARY KEY,
    listID SERIAL NOT NULL,
    task VARCHAR(100),
    isCompleted BOOLEAN DEFAULT false,
        CONSTRAINT fk_list FOREIGN KEY(listID) REFERENCES tasklist(ID)
);

CREATE TABLE forumpost(
    postID SERIAL NOT NULL PRIMARY KEY,
    userID VARCHAR NOT NULL,
    userName VARCHAR,
    postedDate DATE DEFAULT CURRENT_DATE,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    upVote INT NOT NULL,
    commentCount INT NOT NULL
);

CREATE TABLE comments(
    commentID SERIAL NOT NULL PRIMARY KEY,
    postID SERIAL NOT NULL,
    userID VARCHAR NOT NULL,
    userName VARCHAR NOT NULL,
    day DATE DEFAULT CURRENT_DATE,
    comment VARCHAR NOT NULL,
        CONSTRAINT fk_comment FOREIGN KEY(postID) REFERENCES forumpost(postID) ON DELETE CASCADE
);

CREATE TABLE upvotes(
    upVoteID SERIAL NOT NULL PRIMARY KEY,
    postID SERIAL NOT NULL,
    userID VARCHAR NOT NULL,
    day DATE DEFAULT CURRENT_DATE
);

CREATE TABLE favouritecount(
    fcID SERIAL NOT NULL PRIMARY KEY,
    duaID SERIAL NOT NULL,
    userID VARCHAR NOT NULL,
    day DATE DEFAULT CURRENT_DATE
);

CREATE TABLE mysalah(
        ID SERIAL NOT NULL PRIMARY KEY,
        userID VARCHAR NOT NULL,
        waqt VARCHAR NOT NULL,
        isDone BOOL NOT NULL,
        day DATE DEFAULT CURRENT_DATE 
);
