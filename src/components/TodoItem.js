import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit, VisibilityOff } from '@mui/icons-material';

const TodoItem = ({ todo, deleteTodo, toggleComplete, editTodo, toggleHide, markDone }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [open, setOpen] = useState(false);

  const handleToggleEdit = (event) => {
    event.stopPropagation();
    setEditing(!editing);
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    editTodo(todo.id, editedText);
    setEditing(false);
  };

  const handleToggleHide = (event) => {
    event.stopPropagation();
    toggleHide(todo.id);
  };

  const handleToggleComplete = (event) => {
    event.stopPropagation();
    toggleComplete(todo.id);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteTodo(todo.id);
    setOpen(false);
  };

  return (
    <ListItem disablePadding sx={{ filter: todo.hidden ? 'blur(3px)' : 'none' }}>
      <ListItemButton onClick={() => toggleComplete(todo.id)}>
        <ListItemIcon>
          <Delete onClick={handleDelete} className="delete-btn" />
        </ListItemIcon>
        {editing ? (
          <form onSubmit={handleSubmitEdit}>
            <TextField
              type="text"
              value={editedText}
              onChange={handleTextChange}
              autoFocus
              fullWidth
            />
            <Button type="submit">Save</Button>
            <Button onClick={handleToggleEdit}>Cancel</Button>
          </form>
        ) : (
          <>
            <ListItemText
              primary={todo.text}
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                color: todo.completed ? 'green' : 'initial',
              }}
            />
            <Button onClick={handleToggleEdit}>
              <Edit />
            </Button>
            {!todo.completed && (
              <>
                <Button onClick={handleToggleHide}>
                  <VisibilityOff />
                </Button>
                <Button onClick={handleToggleComplete} sx={{ color: 'green' }}>
                  Done
                </Button>
              </>
            )}
          </>
        )}
      </ListItemButton>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default TodoItem;
