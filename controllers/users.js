const User = require('../models/user'); // Modelo debe estar en mayúsculas

// Obtain all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users from database', error });
    }
};

// Obtain a user by its ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Modelo `User` con mayúscula

        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user from database', error });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password }); // Usa `User` para el modelo

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
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
