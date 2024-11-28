const Habit = require('../models/habit');
const User = require('../models/user');


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

exports.getHabitsByUser = async (req, res) => {
  try {
      const habits = await Habit.find({ userId: req.params.userId });

      const user = await User.findById(req.params.userId);

      const message = habits.length === 0 ? "You don't have any habits yet" : null;  // El mensaje si no hay hábitos
      res.render('habits/habits', { 
          title: `Habits for User ${req.params.userId}`, 
          habits, 
          user,
          message  // it passes the message to the view
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving user habits');
  }
};

// show the create habit form
exports.showCreateHabitForm = (req, res) => {
  
  try {
      // Suponiendo que tienes el userId en la sesión del usuario
      const userId = req.session.userId;
      const user = req.session.user;    ; 
      
      // Verificar si el usuario está logueado (si es necesario)
      if (!userId) {
          return res.redirect('/login');  // Redirigir si no está logueado
      }

      // Renderizar el formulario de creación de hábito
      res.render('habits/habitForm', { userId }, user);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al mostrar el formulario de creación de hábito');
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


