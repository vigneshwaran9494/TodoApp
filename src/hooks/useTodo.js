import {useSelector} from 'react-redux';

export default function () {
  // Get current theme from the store
  return useSelector(state => {
    return state.todo.todoList;
  });
}
