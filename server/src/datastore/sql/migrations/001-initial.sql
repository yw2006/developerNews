CREATE TABLE users (
  id        VARCHAR(255) NOT NULL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName  VARCHAR(255) NOT NULL,
  userName  VARCHAR(255) UNIQUE NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL,
  password  VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id        VARCHAR(255) NOT NULL PRIMARY KEY,
  title     VARCHAR(255) NOT NULL,
  url       VARCHAR(255) UNIQUE NOT NULL,
  userId    VARCHAR(255) NOT NULL,
  postedAt  INTEGER NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);