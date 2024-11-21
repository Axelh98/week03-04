const Habit = require('../models/habit');

exports.create = async (req, res) => {  // Crear hábito
    const { name, description, frequency, user } = req.body;

    console.log("data received:", req.body);

    try {
        // Crear un nuevo objeto Habit
        const habit = new Habit({
            name,
            description,
            frequency,
            user
        });

        console.log("Habit created:", habit);

        // Guardar el hábito en la base de datos
        const savedHabit = await habit.save(); // Aquí asignamos el hábito guardado a la variable 'savedHabit'
        
        // Devolver el hábito guardado
        console.log("Hábito guardado:", savedHabit); 
        res.status(201).json({
            message: 'Habit created successfully',
            habit: savedHabit
        });
    } catch (error) {
        // Devolver el error si ocurre
        console.log("Error al crear hábito:", error);
        console.error("Error al crear hábito:", error);  
        res.status(500).json({
            message: 'Error creating habit',
            error: error.message
        });
    }
};

exports.getAllHabits = async (req, res) => {  // Obtener todos los habits
    try {
        console.log('Obteniendo hábitos...');
        const habits = await Habit.find({});
        console.log(habits);
        res.status(200).json({ message: 'Habits retrieved successfully', habits });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habits from database', error });
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

exports.updateHabitById = async (req, res) => {  // Actualizar un habit por su ID
    try {

        // >>>>>>>> Validate the request body
        const { name, description, frequency } = req.body;

        // >>>>>>>> Find the habit by its ID
        const habit = await Habit.findByIdAndUpdate(
            req.params.id, 
            { name, description, frequency }, 
            { new: true });

        console.log(habit);

        // >>>>>>>> If the habit is not found, return a 404 error
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // >>>>>>>> Update the habit
        habit.name = req.body.name;
        habit.description = req.body.description;
        habit.frequency = req.body.frequency;
        
        await habit.save();

        // >>>>>>>> Return the updated habit
        res.status(200).json({ message: 'Habit updated successfully', habit });
    } catch (error) {
        res.status(500).json({ message: 'Error updating habit', error });
    }
};

exports.deleteHabitById = async (req, res) => {
    try {
        console.log("ID recibido para eliminación:", req.params.id);

        const habit = await Habit.findByIdAndDelete(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json({ message: 'Habit deleted successfully', habit });
    } catch (error) {
        console.error("Error deleting habit:", error);
        res.status(500).json({ 
            message: 'Error deleting habit', 
            error: error.message 
        });
    }
};

