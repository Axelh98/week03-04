const Habit = require('../models/habit');

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
      if (!habits.length) {
          return res.status(404).send('No habits found for this user');
      }
      res.render('userHabits', { title: `Habits for User ${req.params.userId}`, habits });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving user habits');
  }
};


// En el controlador habitController.js
exports.showEditHabitForm = async (req, res) => {
  try {
    // Buscar el hábito por ID
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Pasar el título junto con los datos del hábito
    res.render('editHabit', {
      habit,
      title: 'Edit Habit'  // Título personalizado para esta vista
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving habit for edit' });
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

    res.redirect('/habits'); // Redirige a la lista de hábitos después de la eliminación
  } catch (error) {
    res.status(500).render('error', { message: 'Error deleting habit', error });
  }
};


