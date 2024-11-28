const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Search for the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send('Credenciales inválidas');
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Credenciales inválidas');
  }

  // if the password is correct, create a session
  req.session.userId = user._id;
  res.render('dashboard', {
    title: 'Dashboard',
    user: { name: user.name, email: user.email, userId: user._id }
  });
  

};
