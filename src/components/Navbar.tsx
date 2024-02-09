import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
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
        }
      })()}
      <Avatar
        m={4}
        mr={6}
        name={state.userInfo.userName}
        src={state.userInfo.userImage}
      />{" "}
    </Stack>
  );
};
