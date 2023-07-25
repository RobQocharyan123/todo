import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
} from '@mui/material';

const TodoInput = ({ addTodo, onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          label="Enter a new todo..."
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <TextField
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          label="Search todos..."
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleSearch} sx={{ mt: 2 }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default TodoInput;
