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
      <Popover closeOnBlur={false} placement="bottom">
        <PopoverTrigger>
          <Button
            m={4}
            mr={6}
            borderRadius={100}
            backgroundImage={state.userInfo.userImage}
            backgroundSize={"100%"}
          ></Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent bg={"black"} color="white" border={"none"}>
            <PopoverHeader pt={4} fontWeight="bold" border={"none"}>
              {state.userInfo.userName}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Button
                _hover={{ cursor: "pointer", opacity: "0.9" }}
                mt={4}
                colorScheme="blue.600"
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
