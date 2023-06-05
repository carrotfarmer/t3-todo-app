import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { formSchema, type FormData } from "~/types";
import { useTodoStore } from "~/store/TodoStore";

export const NewTodo: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { createTodo } = useTodoStore();

  const { mutate: newTodo } = api.todo.createTodo.useMutation({
    onSuccess: (data) => {
      createTodo(data);
    },
  });

  const onSubmit = (data: FormData) => {
    newTodo(data);
    reset();
  };

  return (
    <Box pt="5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.todoItem)}>
          <Input placeholder="eg: do the dishes" {...register("todoItem")} />

          <FormErrorMessage>{errors.todoItem && errors.todoItem.message?.toString()}</FormErrorMessage>
        </FormControl>

        <Box pt="5">
          <Button variant="outline" colorScheme="orange" type="submit" isLoading={isSubmitting}>
            add todo
          </Button>
        </Box>
      </form>
    </Box>
  );
};
