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

  exports.getAllHabits = async (req, res) => {  // Obtener todos los hábitos
    try {
        console.log('Obteniendo hábitos...');
        const habits = await Habit.find({});
        
        // Verificar cuántos hábitos fueron encontrados
        console.log(`Se encontraron ${habits.length} hábitos.`);
        
        res.status(200).json({ message: 'Habits retrieved successfully', habits });
    } catch (error) {
        console.error("Error retrieving habits:", error);
        res.status(500).json({ message: 'Error retrieving habits from database', error: error.message });
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

exports.getHabitsByUser = async (req, res) => {  // Obtener hábitos de un usuario específico
    try {
        const { userId } = req.params;  // Obtener el userId desde los parámetros de la URL

        // Buscar hábitos por userId
        const habits = await Habit.find({ userId: userId });
        
        // Verificar si se encontraron hábitos para el usuario
        if (habits.length === 0) {
            return res.status(404).json({ message: 'No habits found for this user' });
        }
        
        console.log(`Se encontraron ${habits.length} hábitos para el usuario con ID: ${userId}`);
        
        res.status(200).json({ message: 'Habits retrieved successfully', habits });
    } catch (error) {
        console.error("Error retrieving habits for user:", error);
        res.status(500).json({ message: 'Error retrieving habits from database', error: error.message });
    }
};


exports.updateHabit = async (req, res) => {
  try {
    const { name, description, category, goal, frequency, status, streak } = req.body;
    const habit = await Habit.findByIdAndUpdate(
        req.params.id,
       { name, 
        description, 
        category, 
        goal, 
        frequency, 
        status, 
        streak, 
        updatedAt: Date.now() },
      { new: true }
    );
    console.log(habit);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit updated successfully', habit });
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit', error });
  }
};

// Eliminar un hábito
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    console.log(habit);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit deleted successfully', habit });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit', error });
  }
};

