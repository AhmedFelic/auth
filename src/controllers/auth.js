const User = require('../models/User');


const registerUser = async (req, res) =>{
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
          }
          else{
            const newUser = new User({username, password});
          await  newUser.save()

          } res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
}
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isValidPassword = await existingUser.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    return res.status(200).json({ message: 'Successfully logged in', user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { registerUser, loginUser };
