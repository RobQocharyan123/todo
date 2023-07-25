import React, { useState } from 'react';
import { List, Button } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, toggleComplete, editTodo, toggleHide, markDone }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5; // Number of todos to display per page

  // Calculate the indexes for the current page
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <List>
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
            toggleHide={toggleHide}
            markDone={markDone}
          />
        ))}
      </List>
      <div className="pagination">
        <Button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-btn">
          Previous 
        </Button>
        <span className="page-count">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages} className="pagination-btn">
          Next 
        </Button>
      </div>
    </>
  );
};

export default TodoList;
