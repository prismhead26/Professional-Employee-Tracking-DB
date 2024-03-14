-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

-- @block
CREATE TABLE cats
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the cat
  owner           VARCHAR(150) NOT NULL,                # Owner of the cat
  birth           DATE NOT NULL,                        # Birthday of the cat
  PRIMARY KEY     (id)                                  # Make the id the primary key
);

-- @block
DROP TABLE cats;

-- @block
SELECT * FROM Users;

-- @block
INSERT INTO Users (email, bio, country)  VALUES
( 'hello@world.com', 'foo', 'US' ),
( 'hola@munda.com', 'bar', 'MX' ),
( 'bonjour@monde.com', 'baz', 'US' );

-- @block
INSERT INTO Users (email, bio, country) VALUES
( 'hi@world.com', 'xan', 'US' ),
( 'the@world.com', 'pow', 'US' );

-- @block
INSERT INTO Users (email, bio, country) VALUES
( 'zz@world.com', 'xzz', 'MX' ),
( 'tester@world.com', 'test', 'US' );

-- @block
SELECT id, email, country FROM Users

WHERE country = 'US'
or id > 1

ORDER BY id ASC
LIMIT 2;

-- @block
CREATE INDEX email_index ON Users(email);
