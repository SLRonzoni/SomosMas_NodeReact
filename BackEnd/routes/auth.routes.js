const express = require("express");
const router = express();
const { validateCreate, validateRegister } = require("../validators");
const { login, loginGoogle } = require("../controllers/authControllers");
const { findMe, createUser} = require("../controllers/users.controllers");
const { authenticatedUser, optionsFileUpload } = require("../middlewares");


router.post("/login", validateCreate, login);

router.post("/google", validateCreate, loginGoogle);

router.post("/register", optionsFileUpload ,validateRegister, createUser);

router.get("/me", authenticatedUser, findMe);

module.exports = router;
