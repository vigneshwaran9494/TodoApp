import {combineReducers} from 'redux';
import {api} from '../../services/ApiServices';
import {todoSlice} from '../slice/todo-slice';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  [api.reducerPath]: api.reducer,
  todo: todoSlice.reducer,
});

export default rootReducer;
