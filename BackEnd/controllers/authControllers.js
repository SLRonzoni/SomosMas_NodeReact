const { User } = require("../models");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require('../helpers/tokenGenerator')

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).json({ msg: "No autorizado" });
    } else {
       
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = tokenGenerator(user)
        const userData={firstName:user.firstName,
                    lastName:user.lastName,
                    id:user.id,
                    email:user.email,
                    roleId:user.roleId
        }    
        
        return res.status(200).json({
            token:token,
            user:userData
        })
      } else {
        res.status(401).json({ msg: "No autorizado" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

 //GOOGLE
//passport devuelve el FORMULARIO de autenticación GOOGLE
const loginGoogle = async (req, res) => {
  try{
    router.get("/google",passport.authenticate("google",{
      scope: ["email", "profile"], // los datos que queremos que devuelva google
    }));

    //passport devuelve los datos que recibimos de google y los hace disponibles en la funcion que ejecutamos
    router.get("/google/callback", passport.authenticate("google", { session: false }), async (req, res) => {
        const user = req.user.profile;
        //console.log(user);
        const result = await authServ.socialLogin(user);
        //console.log(result);
        return providerResponse(res, result, 401);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


// //SOCIAL LOGIN  👌
// async socialLogin(data){
//   const userServ = new User()
//   // //Asigno los datos que envia el proveedor, a mis variables de base de datos users
//   let user,providerLastName,providerName,providerEmail='';

//   if(data.provider==='google' || data.provider==='facebook' ){
//       providerName=data.name.givenName,
//       providerLastName=data.name.familyName,
//       providerEmail=data.emails[0].value
//   };

//   if(data.provider==='github'){
//       providerName=data.displayName,
//       providerLastName=data.displayName,
//       providerEmail=data.email       

//       if(data._json.email===null ||  data.emails ===null){
//       providerEmail='slronzoni@gmail.com'
//       };
//   };   
  
//    user={
//       idProvider:data.id,
//       //name:data.displayName,
//       //email:data.emails[0].value,
//       //lastName:data.displayName,
//       name:providerName,
//       lastName:providerLastName,
//       email:providerEmail,
//       pic:data.photos[0].value,
//       provider:data.provider
//       }
  
//   const result = await userServ.getOrCreateByProvider(user)

//   if(!result.created){
//       return {
//           success:false,
//           errors:result.errors
//       }
//   }
 
//   return this.#getUserData(result.user)
// } 


// //DATOS DEL USUARIO Y TOKEN  👌
// #getUserData(user){ 
//   const userData={
//       name:user.name,
//       lastName:user.lastName,
//       role:user.role, 
//       provider:user.provider,
//       idProvider:user.idProvider,
//       // stripeCustomerID:user.stripeCustomerID,
//       email:user.email,
//       _id:user._id 
//   }
//   const token=this.#createToken(userData)                                         
//   return{
//       success:true,
//       user:userData,
//       token
//   }
  
// }

// //CREAR TOKEN con tiempo de expiracion en .env  👌
// #createToken(payload){
//   const token= jwt.sign(payload,tokenSecret,{
//       expiresIn:tokenExpires
//   }) 
//   return token
// }

// //ENCRIPTAR PASSWORD  👌
// async #encrypt(string){
//   try{
//       const salt = await bcrypt.genSalt()
//       const hash = await bcrypt.hash(string,salt)
//       return hash
//   }
//   catch(error){
//       console.log(error)
//   }
// }

// //VERIFICAR SI ES CORRECTA PASSWORD  👌
// async #compare(string,hash){
//   try{      
//       return await bcrypt.compare(string,hash)
//   } catch(error){
//       return false
//   }
// }

// }

module.exports = { login, loginGoogle };
