CREATE TABLE user ( 
    userId      INT(11)     PRIMARY KEY AUTO_INCREMENT, 
    userName    VARCHAR(64) DEFAULT 'unknown', 
    EMAIL       VARCHAR(64) NOT NULL, 
    PW          VARCHAR(64) NOT NULL,
    regDate     DATETIME    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article ( 
    articleNo       INT(11)     PRIMARY KEY AUTO_INCREMENT, 
    articleTitle    VARCHAR(200), 
    articleContents VARCHAR(4000), 
    authorId        INT(11)     NOT NULL,
    regDate         DATETIME    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES user (userId)
);

CREATE TABLE comment ( 
    articleNo       INT(11)     NOT NULL, 
    commentNo       INT(11)     PRIMARY KEY AUTO_INCREMENT, 
    commentText     VARCHAR(1000), 
    authorId        INT(11)     NOT NULL,
    regDate         DATETIME    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (articleNo) REFERENCES article (articleNo),
    FOREIGN KEY (authorId)  REFERENCES user (userId)
);