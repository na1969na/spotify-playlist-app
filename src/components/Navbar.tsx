import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { StoreContext } from "../utils/DataStoreContext";
import { PlaylistData } from "../types/SpotifyApi";
import { pageCases, reducerCases } from "../utils/Constants";

export const Navbar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    checkInputValue(e.target.value);
  };

  const checkInputValue = (value: string) => {
    if (value === "") {
      return;
    }

    const searchedItems: PlaylistData[] = state.playlists.filter(
      (playlist) =>
        Object.values(playlist).filter(
          (item) =>
            item !== undefined &&
            item !== null &&
            item.toUpperCase().indexOf(value.toUpperCase()) !== -1
        ).length > 0
    );
    dispatch({ type: reducerCases.SET_PLAYLISTS, payload: searchedItems });
  };

  const clickBackBtn = () => {
    dispatch({ type: reducerCases.SET_PAGE, payload: pageCases.HOME_PAGE });
  };

  return (
    <Stack direction="row">
      {(() => {
        if (state.selectedPage === pageCases.HOME_PAGE) {
          return (
            <InputGroup m={4} ml={50} size="lg">
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="#181818" />}
              />
              <Input
                placeholder="playlist"
                borderRadius={30}
                border={"none"}
                bgColor={"#f5f5f5"}
                width={400}
                value={inputValue}
                onChange={handleInputChange}
              />
            </InputGroup>
          );
        } else if (state.selectedPage === pageCases.DETAIL_PAGE) {
          return (
            <IconButton
              aria-label="Back to Home"
              icon={<ChevronLeftIcon />}
              onClick={clickBackBtn}
              bg={"#181818"}
              w={10}
              h={8}
              color={"#f5f5f5"}
              m={4}
              _hover={{ opacity: "0.8" }}
            />
          );
        }
      })()}
      <Spacer />
      <Avatar
        m={4}
        mr={6}
        name={state.userInfo.userName}
        src={state.userInfo.userImage}
      />{" "}
    </Stack>
  );
};
