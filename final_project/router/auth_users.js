const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username: "user1", password: "password1" }];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  return !users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (user) {
    return user.password === password;
  }
  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  // The code must validate and sign in a customer based on the username and password
  // It must also save the user credentials for the session as a JWT.

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ username }, "access");
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "User logged in successfully" });
  } else {
    return res.status(400).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // You have to give a review as a request query & it must get posted with the username
  // (stored in the session) posted. If the same user posts a different review on the same ISBN,
  // it should modify the existing review. If another user logs in and posts a review on the same ISBN,
  // it will get added as a different review under the same ISBN.

  const { isbn } = req.params;
  const { review } = req.body;
  const { username } = req.user;

  if (!review) {
    return res.status(400).json({ message: "Review required" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;
  return res.status(200).json({ message: "Review added successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Filter & delete the reviews based on the session username,
  // so that a user can delete only his/her reviews and not other users’.
  const { isbn } = req.params;
  const { username } = req.user;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
