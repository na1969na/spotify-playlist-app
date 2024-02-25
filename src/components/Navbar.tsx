import React, { useContext } from "react";
import {
  Spacer,
  Stack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Portal,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import { StoreContext } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";

export const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const onLogout = () => {
    dispatch({
      type: reducerCases.SET_USER,
      payload: null,
    });
  };

  return (
    <Stack direction="row">
      <Spacer />
      <Popover closeOnBlur={false} placement="left">
        <PopoverTrigger>
          <Button
            m={4}
            mr={6}
            borderRadius={100}
            backgroundImage={state.userInfo.userImage}
            backgroundSize={"100%"}
            _hover={{ cursor: "pointer", opacity: "0.7" }}
          ></Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent bg={"#181818"} color="white" border={"none"}>
            <PopoverHeader pt={4} fontWeight="bold">
              <HStack>
                <Avatar name="User image" src={state.userInfo.userImage} />
                <Text>{state.userInfo.userName}</Text>
              </HStack>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Button
                w={"100%"}
                border={"none"}
                bg={"gray.400"}
                onClick={onLogout}
                as="a"
                href="/"
              >
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Stack>
  );
};
