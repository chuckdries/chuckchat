CREATE TABLE Messages (
    message STRING,
    user    INTEGER REFERENCES Users (id),
    id      INTEGER PRIMARY KEY
);
