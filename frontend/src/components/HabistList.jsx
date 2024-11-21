import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HabitsList = () => {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/habits') // URL de tu backend
      .then((response) => {
        console.log(response.data.habits)
        setHabits(response.data.habits); // Almacenar los hábitos en el estado
      })
      .catch((error) => {
        setError('cannot load habits');
        console.error('Error:', error);
      });
  }, []); 

  return (
    <div>
      <h1>Mis Hábitos</h1>
      {error && <p>{error}</p>}
      <ul>
        {habits.length > 0 ? (
          habits.map((habit) => (
            <li key={habit._id}>
              <h2>{habit.name}</h2>
              <p>{habit._id}</p>
              <p>{habit.description}</p>
              <p>{habit.category}</p>
              <p><strong>Frecuencia:</strong> {habit.frequency}</p>
            </li>
          ))
        ) : (
          <p>No tienes hábitos registrados.</p>
        )}
      </ul>
    </div>
  );
};

export default HabitsList;
