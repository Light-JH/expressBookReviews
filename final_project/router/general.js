const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let userName = req.query.userName;
  let password = req.query.password;

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let message = JSON.stringify(books);
  return res.status(200).json(message);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let ISBN = req.params.isbn;
  const book = books[ISBN];
  if (book) {
    return res.status(200).json(book); 
  } else
   return res.status(500).json({message: "invalid ISBN"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  let author = req.params.author;
  let booksByAuthor = books.values().filter(book => book.author === author)
  let message = JSON.stringify(booksByAuthor);
  if (message){
    return res.status(200).json(message); 
  } else {
    return res.status(500).json({message: "no books for the author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let booksByTitle = books[1].values().filter(book => book.title === title);
  let message = JSON.stringify(booksByTitle);
  if (message){
    return res.status(200).json(message); 
  } else {
    return res.status(500).json({message: "no books with your search"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let ISBN = req.params.isbn;
  let book = books[ISBN];
  if (book){
    return res.status(200).json(book[reviews]);
  } else {
    return res.status(500).json({message: "no reviews for this book"});
  }
  
  
 });

module.exports.general = public_users;
