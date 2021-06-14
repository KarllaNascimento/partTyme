
//chamando arquivos
const db = require("../src/database/database.js")
const authRouter = require("./routes/auth.routes.js")
const express = require("express");
const cors = require("cors");

//conectando com o banco de dados
db.connect()
const app = express()

//executando 
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

//rota de autenticação
app.use("/api/auth", authRouter);

//exportando o app(express)
module.exports = app 