const User = require("../models/user")
const router = require("express").Router();
const bcrypt = require("bcrypt")

//middlewares
const verifiedToken = require("../helpers/check-token")


// get an user / obter um usuário
router.get("/:id", verifiedToken, async (req, res)=>{

   const id = req.params.id;
   
   try {
      //verify user / verificar se o usuário existe 
   const user = await User.findOne({ _id: id }, { password: 0 })  // faz com que seja recebido apenas o nome e e-mail

   res.json({error: null, user})

   } catch (err) {
      
      return res.status(400).json({error: "O usuário não existe!"})
   }


});

// update an user / atualizar um usuário
router.put("/", verifiedToken, async (req, res)=>{

});

   

   



module.exports = router;
