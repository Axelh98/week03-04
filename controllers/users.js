const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

// Obtain all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users', { title: 'All Users', users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
    }
};

// Obtain a user by its ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('userDetails', { title: 'User Details', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user');
    }
};

// Este es el controlador donde registras un nuevo usuario
exports.registerUser = async (req, res) => {
  const {name, email, password } = req.body;

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

  res.send('Usuario registrado exitosamente');
};


// Update a user by its ID
exports.updateUserById = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user by its ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Show the profile page
exports.showProfile = async (req, res) => {
    try {
      const userId = req.session.userId; // Usamos el ID de usuario de la sesión
      const user = await User.findById(userId); // Buscamos el usuario en la base de datos
  
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Renderizar la vista del perfil
      res.render('users/profile', {
        title: 'Perfil',
        user: user // Pasamos el usuario a la vista
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error del servidor');
    }
  };
  

// Show the settings page
exports.showSettings = async (req, res) => {
  try {
    const userId = req.session.userId; // Obtener el ID del usuario desde la sesión
    const user = await User.findById(userId); // Buscar el usuario en la base de datos

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Renderizar la vista de ajustes
    res.render('users/settings', {
      title: 'Ajustes',
      user: user // Pasamos el usuario actual a la vista
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

// Update the user's settings
exports.updateSettings = async (req, res) => {
  try {
    const { firstName, lastName, email, password, newPassword } = req.body;
    const userId = req.session.userId; // Obtener el ID del usuario desde la sesión

    const user = await User.findById(userId); // Buscar al usuario en la base de datos

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña actual con la guardada

      if (!isMatch) {
        return res.status(401).send('Contraseña actual incorrecta');
      }

      
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    
    res.redirect('users/settings');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar los ajustes');
  }
};
