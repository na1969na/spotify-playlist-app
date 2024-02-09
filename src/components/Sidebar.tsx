import React, { useContext } from "react";
import { MdHomeFilled } from "react-icons/md";
import { MdMusicVideo } from "react-icons/md";
import { StoreContext } from "../utils/DataStoreContext";
import { pageCases, reducerCases } from "../utils/Constants";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const clickMenu = (item: string) => {
    dispatch({
      type: reducerCases.SET_PAGE,
      payload: item,
    });
  };

  return (
    <VStack
      bgColor={"blackAlpha.600"}
      borderRadius={10}
      m={1}
      color={"#f5f5f5"}
    >
      <Box>
        <Text fontSize="lg">PLAYLIST</Text>
      </Box>
      <Box _hover={{ bg: "black" }} cursor={"pointer"} w={"100%"}>
        <HStack onClick={() => clickMenu(pageCases.HOME_PAGE)}>
          <MdHomeFilled />
          <Text>Home</Text>
        </HStack>
      </Box>
      <Box _hover={{ bg: "black" }} cursor={"pointer"} w={"100%"}>
        <HStack onClick={() => clickMenu(pageCases.CREATE_PAGE)}>
          <MdMusicVideo />
          <Text>Create New Playlist</Text>
        </HStack>
      </Box>
    </VStack>
  );
};