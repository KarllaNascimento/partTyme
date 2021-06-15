const User = require("../models/user")
const controller = require("../controller/controllers");
const router = require("express").Router();
const bcrypt = require("bcrypt"); //criar uma senha por uma hash
const jwt = require("jsonwebtoken"); //vai controlar a autenticação do usuário
const app = require("../app");

// register an user/registrar um usuário no sistema
router.post("/register", async (req, res) =>{

   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const confirmPassword = req.body.confirmPassword;

   // check for required fields / validação dos campos que são obrigatórios
   if(name == null || email == null || password == null || confirmPassword == null) {
      return res.status(400).json({error: "Por favor, preencha todos os campos!"})
   }

   //check if password math / conferir se as senhas combinam
   if(password != confirmPassword) {
      return res.status(400).json({error: "As senhas não conferem! Tente novamente."})
   }

   //check  if user exists / verificar se usuário(email) já existe cadastrado no sistema
   const emailExists = await User.findOne({ email: email });

   if(emailExists) {
      return res.status(400).json({error: "O e-mail informado já está cadastrado!"})
   }

   // create password / criar senha
   //salt é uma hash para adcionar a senha e deixar ela ainda mais exclusiva  
   // 12 caracteres
   const salt = await bcrypt.genSalt(12);
   const passwordHash = await bcrypt.hash(password, salt);

   const user = new User({
      name: name,
      email: email,
      password: passwordHash
   });

   try {

      const newUser  = await user.save();

      //create token 
      const token = jwt.sign(
         //payload / o que será possível acessar caso o token seja decodificado
         {
            name: newUser.name,
            id: newUser._id
         },
         "nossoscret"
      )
      
      // return token
      
      res.json({error: null, msg: "Você realizou o cadastro com sucesso.", token: token, userId: newUser._id})

   } catch (error) {
      res.status(400).json({error})
   }

});

// login an user / logar um usuário
router.post("/login", async (req, res)=>{

   const email = req.body.email;
   const password = req.body.password;

   // check if user exists / confirmar se o usuário existe
   const user = await User.findOne({ email: email })

   if(!user){
      return res.status(400).json({error: "Não existe um usuário cadastrado com este e-mail!"})
   }

   //check if password match / confirmar se a senha corresponde a já cadastrada
   const checkPassword = await bcrypt.compare(password, user.password);

   if(!checkPassword){
      return res.status(400).json({error: "Senha incorreta!"})
   }

   //create token 
   const token = jwt.sign(
      //payload / o que será possível acessar caso o token seja decodificado
      {
         name: user.name,
         id: user._id
      },
      "nossoscret"
   )
   
   // return token
   
   res.json({error: null, msg: "Você está autenticado!", token: token, userId: user._id})

});








module.exports = router;