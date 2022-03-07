import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  todoList: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    updateTodoList: (state, {payload}: PayloadAction<{}>) => {
      state.todoList = payload;
    },
    addTodo: (state, {payload}: PayloadAction<{}>) => {
      state.todoList = [payload, ...state.todoList];
    },
    editTodo: (state, {payload}: PayloadAction<{}>) => {
      state.todoList = state.todoList.map(todo =>
        todo.id === payload.id ? payload : todo,
      );
    },
    deleteTodo: (state, {payload}: PayloadAction<{}>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== payload.id);
    },
  },
});

// Export all of the actions
export const {updateTodoList, addTodo, editTodo, deleteTodo} =
  todoSlice.actions;
