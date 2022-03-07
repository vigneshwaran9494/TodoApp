import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from '../config/Config';

const url = 'todos';

type todoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'todoListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BaseUrl,
    prepareHeaders: async (headers, {}) => {
      headers.set('Content-Type', 'application/json');
      //If we have a token set in state, let's assume that we should be passing it.
      return headers;
    },
  }),

  endpoints: builder => ({
    fetchTodoList: builder.mutation<{}, {}>({
      query: body => ({
        url: url,
        method: 'GET',
        body,
      }),
    }),
    addTodo: builder.mutation<{}, {}>({
      query: body => ({
        url: url,
        method: 'POST',
        body,
      }),
    }),
    editTodo: builder.mutation<{}, {}>({
      query: (body: todoItem) => ({
        url: url + `/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteTodo: builder.mutation<{}, {}>({
      query: (body: todoItem) => ({
        url: url + `/${body.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useFetchTodoListMutation,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = api;

// Possible exports
export const {endpoints, reducerPath, reducer, middleware} = api;
