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

module.exports = { login };
