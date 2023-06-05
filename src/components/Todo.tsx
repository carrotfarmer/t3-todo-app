import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTodoStore } from "~/store/TodoStore";
import { TodoType } from "~/types";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "~/types";

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const {
    deleteTodo,
    toggleComplete: toggleCompleteState,
    editTodo: editTodoState,
  } = useTodoStore();

  const { mutate: removeTodo } = api.todo.deleteTodo.useMutation({
    onSuccess: (data) => {
      deleteTodo(data.id);
    },
  });

  const { mutate: toggleComplete } = api.todo.toggleComplete.useMutation({
    onSuccess: (data) => {
      toggleCompleteState(data.id);
    },
  });

  const { mutate: editTodo } = api.todo.editTodo.useMutation({
    onSuccess: (data) => {
      editTodoState(todo.id, data.todoItem);
    },
  });

  const { isOpen, onToggle, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    onClose();
    editTodo({ todoId: todo.id, newTodo: data.todoItem });
    reset();
  };

  return (
    <Box p="5" border="1px" borderColor="gray.600" borderRadius="md" shadow="md" mt="5" w="lg">
      <HStack>
        <Checkbox
          isChecked={todo.isComplete}
          pr="3"
          onChange={() => toggleComplete({ todoId: todo.id, completionStatus: !todo.isComplete })}
        />
        <Text as={todo.isComplete ? "s" : "p"}>{todo.todoItem}</Text>

        <Spacer />

        <ButtonGroup>
          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button colorScheme="orange" size="xs" onClick={onToggle}>
                edit
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <PopoverHeader fontWeight="semibold">edit todo</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <FormControl isInvalid={Boolean(errors.todoItem)}>
                    <Input
                      placeholder="eg: wash the car"
                      defaultValue={todo.todoItem}
                      {...register("todoItem")}
                    />

                    <FormErrorMessage>
                      {errors.todoItem && errors.todoItem.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </PopoverBody>
                <PopoverFooter>
                  <Button
                    type="submit"
                    onClick={onClose}
                    colorScheme="orange"
                    isLoading={isSubmitting}
                  >
                    edit
                  </Button>
                </PopoverFooter>
              </form>
            </PopoverContent>
          </Popover>

          <Button colorScheme="red" size="xs" onClick={() => removeTodo({ todoId: todo.id })}>
            delete
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};
