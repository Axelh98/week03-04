const User = require('../models/user'); // Asegúrate de que el modelo de usuario está correctamente configurado

// Mostrar el perfil del usuario
exports.showProfile = async (req, res) => {
  try {
    const userId = req.session.userId; 
    const user = await User.findById(userId); 

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
