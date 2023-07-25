import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        hidden: false,
      },
    ]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleHide = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, hidden: !todo.hidden } : todo
    );
    setTodos(updatedTodos);
  };

  const markDone = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const handleSearch = (searchText) => {
    const filteredTodos = todos.map((todo) => ({
      ...todo,
      hidden: !todo.text.toLowerCase().includes(searchText.toLowerCase()),
    }));
    setTodos(filteredTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          ToDo List
        </Typography>
        <TodoInput addTodo={addTodo} onSearch={handleSearch} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          toggleHide={toggleHide}
          markDone={markDone}
        />
        <Button variant="contained" color="secondary" onClick={deleteAll}>
          Delete All
        </Button>
      </Paper>
    </Container>
  );
};

export default App;
