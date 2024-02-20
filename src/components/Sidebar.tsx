import React, { useContext } from "react";
import { MdHomeFilled } from "react-icons/md";
import { StoreContext } from "../utils/DataStoreContext";
import { pageCases, reducerCases } from "../utils/Constants";
import { Box, VStack, Text, HStack, Center } from "@chakra-ui/react";
import { ImHeadphones } from "react-icons/im";
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
    <VStack bgColor={"blackAlpha.600"} color={"#f5f5f5"}>
      <HStack mt={1} fontSize={35} color={"yellow.200"}>
        <ImHeadphones />
        <Text fontWeight="semibold" as="h1">
          Fun Mix
        </Text>
      </HStack>
      <Box _hover={{ bg: "blackAlpha.500" }} cursor={"pointer"} w={"100%"} h={"8%"} fontSize={20}>
        <HStack onClick={() => clickMenu(pageCases.HOME_PAGE)} ml={2} p={3}>
          <GoHome /> <Text>Home</Text>
        </HStack>
      </Box>
      <Box _hover={{ bg: "blackAlpha.500" }} cursor={"pointer"} w={"100%"} fontSize={20}>
        <HStack onClick={() => clickMenu(pageCases.CREATE_PAGE)} ml={2} p={3}>
          <MdOutlineAddBox /> <Text>New Playlist</Text>
        </HStack>
      </Box>
    </VStack>
  );
};
