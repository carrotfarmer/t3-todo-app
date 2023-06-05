import { type NextPage } from "next";

import { Box, Center } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";
import { NewTodo } from "~/components/NewTodo";
import { Todos } from "~/components/Todos";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />

      <Center>
        <Box w="lg">
          <NewTodo />
        </Box>
      </Center>

      <Center>
        <Box pt="5">
          <Todos />
        </Box>
      </Center>
    </>
  );
};

export default Home;
