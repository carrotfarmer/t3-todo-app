import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTodoStore } from "~/store/TodoStore";
import { api } from "~/utils/api";
import { Todo } from "./Todo";
import { useSession } from "next-auth/react";

export const Todos: React.FC = ({}) => {
  const { data: todosData, isLoading } = api.todo.getTodos.useQuery();

  const { todos, setTodos } = useTodoStore();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (todosData) {
      setTodos(todosData);
    }
  }, [todosData, setTodos])

  if (!sessionData) {
    return (
      <Box>
        please sign in to continue
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box pt="5">
        <Spinner />
      </Box>
    );
  }

  return (
    <div>
      {todos.length > 0 ? todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      )) : (
        <Box>
          <Text>no todos yet</Text>
        </Box>
      )}
    </div>
  );
};
