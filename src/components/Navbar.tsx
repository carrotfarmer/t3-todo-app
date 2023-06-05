import {
  Box,
  Flex,
  Button,
  Heading,
  Avatar,
} from "@chakra-ui/react";

import { signIn, signOut, useSession } from "next-auth/react"

import Link from "next/link";

export const Navbar = () => {
  const { data: sessionData } = useSession()

  return (
    <Box>
      <Flex bg="orange.500" p={6}>
        <Link href="/">
          <Heading size="xl" color="white">
            todo app
          </Heading>
        </Link>
        <Box ml={"auto"}>
          {sessionData ? (
            <Button
              colorScheme="orange"
              // eslint-disable-next-line
              onClick={() => signOut()}
              size="lg"
            >
              sign out
            </Button>
          ) : (
            <Button
              colorScheme="orange"
              // eslint-disable-next-line
              onClick={() => signIn()}
              size="lg"
            >
              sign in 
            </Button>
          )}

          <Avatar ml={4} src={sessionData?.user?.image as string} />
        </Box>
      </Flex>
    </Box>
  );
};
