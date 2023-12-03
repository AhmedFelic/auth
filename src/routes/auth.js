const auth = require("../controllers/auth");
const { Router } = require("express");


const authRouter = Router();
authRouter.post('/register', auth.registerUser);
authRouter.post('/login', auth.loginUser);


module.exports = authRouter;
