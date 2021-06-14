//require("dotenv").config()
const mongoose = require("mongoose");

const connect = () =>{mongoose.connect("mongodb://localhost:27017/", {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
})
   .then(console.log("Database conectada com sucesso"))
   .catch(err => console.error)
}

module.exports = { connect }