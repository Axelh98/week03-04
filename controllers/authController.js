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
    return res.status(401).send('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password:', password); // Contraseña ingresada
  console.log('Hashed Password:', user.password); // Contraseña cifrada en la base de datos
  if (!isMatch) {
    return res.status(401).send("Invalid credentials");
  }

  // if the password is correct, create a session
  req.session.userId = user._id;
  res.render('dashboard', {
    title: 'Dashboard',
    user: { name: user.name, email: user.email, userId: user._id }
  });
};

// Logout del usuario
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/auth/login');  // Redirige al login después de cerrar sesión
  });
};

// Render the register page
exports.renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};


// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si ya existe un usuario con ese correo
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('El correo electrónico ya está registrado');
    }

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña cifrada
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Redirigir al login si el usuario se creó exitosamente
    res.redirect('/auth/login');

  } catch (error) {
    // Mostrar el error en la consola para depuración
    console.error('Error al registrar el usuario:', error);

    // Enviar un mensaje de error al cliente
    res.status(500).send('Hubo un error al registrar el usuario. Por favor, intenta de nuevo más tarde.');
  }
};
