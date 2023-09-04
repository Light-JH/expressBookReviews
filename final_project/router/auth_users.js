const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    const minLength = 5;
    const maxLength = 20;
    const allowedCharacters = "/^[a-zA-Z0-9_]+$/";

    if (username.length >= minLength && (username.length <= maxLength) 
            && allowedCharacters.test(username)) {
        if (!users.includes(username)) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

const authenticatedUser = (username,password)=>{ 
    const user = users.find( user => user.username && user.password === password);
    if (user) {
        return true;
    } else {
        return false;
    }    
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    const username = req.query.username;
    const password = req.query.password;
    if (authenticatedUser(username, password)) {
        jwt.sign({username: username, password: password}, JWT_SECRET, {expiresIn:'1h'},(err,token) => {
            if(err) {console.log(err)}
            res.send(token)
        })
    }
    else {
        return res.status(300).json({message: "wrong user"});
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { reviews } = req.query.reviews;
  const { username } = req.query.username;
  const isbn = req.params.isbn;
  const book = books.filter(book => book.isbn === isbn)
  book.values()[reviews].append({username:reviews})
  if (book) {
    return res.status(200).json({message: "reviews added"})
  }
    return res.status(500).json({message: "invalid book"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.filter(book => book.isbn === isbn)
    if (book) {
        books.delete(book)
        return res.status(200).json({message: "book deleted"});
    } else {
        return res.status(500).json({message: "invalid book"});
    }
    
    
}

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
