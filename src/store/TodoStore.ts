import { create } from "zustand";
import type { TodoType } from "~/types";

interface TodoState {
  todos: TodoType[];
}

interface TodoActions {
  setTodos: (todos: TodoType[]) => void;
  createTodo: (newTodo: TodoType) => void;
  deleteTodo: (todoId: string) => void;
  toggleComplete: (todoId: string) => void;
  editTodo: (todoId: string, newTodo: string) => void;
}

export const useTodoStore = create<TodoState & TodoActions>()((set) => ({
  todos: [],
  createTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  setTodos: (todos) => set(() => ({ todos })),
  deleteTodo: (todoId) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== todoId) })),
  toggleComplete: (todoId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
      ),
    })),

  editTodo: (todoId, newTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, todoItem: newTodo } : todo
      ),
    })),
}));
