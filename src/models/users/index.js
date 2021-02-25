const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");

const dbPath = path.join(__dirname, "..", "..", "..", process.env.URI);

const getUserById = (userId) => {
  try {
    const existingUsers = await User.findOne({ id }).lean();
    return existingUsers.find((user) => user.id === userId);
  } catch (error) {
    throw new Error("Database connection failed!");
  }
};

const getUserByUsername = (username) => {
  try {
    const existingUsers = await User.findOne({ username }).lean();
    return existingUsers.find((user) => user.username === username);
  } catch (error) {
    throw new Error("Database connection failed!");
  }
};

const persistUser = (username, password, email, firstname, lastname) => {
  let newUserID = 1;
  let existingUsers = [];

  if (fs.existsSync(dbPath)) {
    existingUsers = JSON.parse(fs.readFileSync(dbPath));
    const isUnique =
      existingUsers.find(
        (user) => user.email === email || user.username === username
      ) === undefined;

    if (!isUnique) {
      throw new Error("Given e-mail address and/or username is already taken!");
    }
    newUserID =
      existingUsers.length > 0
        ? existingUsers[existingUsers.length - 1].id + 1
        : 1;
  }

  const passwordHash = bcryptjs.hashSync(password);
  const user = {
    id: newUserID,
    firstname,
    lastname,
    email,
    username,
    password: passwordHash,
  };

  existingUsers.push(user);
  fs.writeFileSync(dbPath, JSON.stringify(existingUsers));

  return user;
};

module.exports = {
  getUserByUsername,
  persistUser,
  getUserById,
};
