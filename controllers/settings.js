const User = require('../models/user');
const bcrypt = require('bcryptjs'); // Usamos bcryptjs para el hash de contraseñas

// Mostrar la página de ajustes del usuario
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

// Actualizar la información del usuario
exports.updateSettings = async (req, res) => {
  try {
    const { firstName, lastName, email, password, newPassword } = req.body;
    const userId = req.session.userId; // Obtener el ID del usuario desde la sesión

    const user = await User.findById(userId); // Buscar al usuario en la base de datos

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Verificar la contraseña actual si es necesario
    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña actual con la guardada

      if (!isMatch) {
        return res.status(401).send('Contraseña actual incorrecta');
      }

      // Hashear la nueva contraseña
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Actualizar los demás datos (nombre y correo electrónico)
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // Guardar los cambios en la base de datos
    await user.save();

    // Redirigir o mostrar mensaje de éxito
    res.redirect('users/settings'); // O muestra un mensaje de éxito si prefieres
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar los ajustes');
  }
};
