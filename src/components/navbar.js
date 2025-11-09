import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <>
      <Flex
        as="nav"
        bg="gray.800"
        color="white"
        align="center"
        justify="space-between"
        paddingX={6}
        paddingY={4}
        boxShadow="md"
      >
        <Heading size="md">Miles4Manny</Heading>
      </Flex>
    </>
  );
};

export default NavBar;
