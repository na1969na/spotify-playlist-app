import React, { useContext } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { pageCases, reducerCases } from "../utils/Constants";
import { Box, Text, HStack, Flex, Stack } from "@chakra-ui/react";
import { MdOutlineAddBox } from "react-icons/md";
import { GoHome } from "react-icons/go";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const clickMenu = (item: string) => {
    dispatch({
      type: reducerCases.SET_PAGE,
      payload: item,
    });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgColor={"blackAlpha.600"}
      color={"white"}
      fontWeight={"semibold"}
    >
      <Box p={"0.5rem"}>
        <Stack p="1rem" borderBottom={"0.1px solid"}>
          <Text>Fun Mix</Text>
        </Stack>
        <HStack
          mt={"1.5rem"}
          p="1rem"
          borderRadius={10}
          cursor={"pointer"}
          onClick={() => clickMenu(pageCases.HOME_PAGE)}
          _hover={{ fontWeight: "bold" }}
        >
          <GoHome />
          <Text>Home</Text>
        </HStack>
        <HStack
          p="1rem"
          borderRadius={10}
          cursor={"pointer"}
          onClick={() => clickMenu(pageCases.CREATE_PAGE)}
          _hover={{ fontWeight: "bold" }}
        >
          <MdOutlineAddBox />
          <Text>Create playlist</Text>
        </HStack>
      </Box>
    </Flex>
  );
};
