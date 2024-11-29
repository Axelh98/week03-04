const Habit = require('../models/habit');
const User = require('../models/user');
const mongoose = require('mongoose');


// create a new habit
exports.createHabit = async (req, res) => {
    try {

    
      const { name, description, category, startDate, goal, frequency, userId } = req.body;
      const habit = new Habit({ name, description, category, startDate, goal, frequency, userId });

      console.log(habit);
  
      await habit.save();
      res.status(201).json({ message: 'Habit created successfully', habit });

    } catch (error) {

      res.status(500).json({ message: 'Error creating habit', error });
    }
  };

  exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find({});
        res.render('habits', { title: 'All Habits', habits });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving habits');
    }
};


exports.getHabitById = async (req, res) => {  // Obtener un habit por su ID
    try {
        // >>>>>>>> Find the habit by its ID
        const habit = await Habit.findById(req.params.id);
        console.log(habit);

        // >>>>>>>> If the habit is not found, return a 404 error
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        // >>>>>>>> Return the habit
        res.status(200).json({ message: 'Habit retrieved successfully', habit });
        // >>>>>>>> If the habit is found, return it
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habit', error });
    }
};


// Obtain all habits by user
exports.getHabitsByUser = async (req, res) => {
  try {
      const userId = req.session.userId;

      // Verificar si el userId es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
      };

      const user = await User.findById(userId);      
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const habits = await Habit.find({ userId });

      const message = habits.length === 0 ? "You don't have any habits yet" : null;
      res.render('habits/habits', { 
          title: `Habits for User ${userId}`, 
          habits, 
          user, // Pasamos el objeto completo
          message
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving habit", error });
  }
};


// show the create habit form
exports.showCreateHabitForm = async (req, res) => {
  try {
      // Suponiendo que tienes el userId en la sesión del usuario
      const userId = req.session.userId;

      // Verificar si el usuario está logueado (si es necesario)
      if (!userId) {
          return res.redirect('/login'); // Redirigir si no está logueado
      }

      // Buscar al usuario en la base de datos (ahora puedes usar await porque la función es async)
      const user = await User.findById(userId);

      // Renderizar el formulario de creación de hábito
      res.render('habits/habitForm', {
          userId,
          user,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al mostrar el formulario de creación de hábito');
  }
};

// show the edit habit form
exports.showEditHabitForm = async (req, res) => {
  try {
    const habitId = req.params.habitId; // Asegúrate de que habitId está definido en la ruta
    const habit = await Habit.findById(habitId); // Busca el hábito por su ID

    if (!habit) {
      return res.status(404).send('Hábito no encontrado');
    }

    // Renderiza la vista editHabit y pasa el objeto habit
    res.render('habits/editHabit', {
      title: 'Editar Hábito',
      habit, // Pasamos el hábito a la vista
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { name, description, category, goal, frequency, status, streak } = req.body;

    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, description, category, goal, frequency, status, streak, updatedAt: Date.now() },
      { new: true }
    );

    if (!habit) {
      return res.status(404).render('error', { message: 'Habit not found' });
    }

    res.redirect('/habits'); 
  } catch (error) {
    res.status(500).render('error', { message: 'Error updating habit', error });
  }
};

// Eliminar un hábito
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    if (!habit) {
      return res.status(404).render('error', { message: 'Habit not found' });
    }

    res.redirect('/habits');
  } catch (error) {
    res.status(500).render('error', { message: 'Error deleting habit', error });
  }
};


