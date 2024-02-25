import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  InputRightAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { PlaylistData } from "../types/SpotifyApi";
import { StoreContext } from "../utils/DataStoreContext";

type Props = { setPlaylists: any };

export const SearchInput: React.FC<Props> = ({ setPlaylists }) => {
  const { state } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [showClearBtn, setshowClearBtn] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setshowClearBtn(true);
    setInputValue(e.target.value);
    checkInputValue(e.target.value);
  };

  const checkInputValue = (value: string) => {
    if (value === "") {
      return;
    }

    const searchedItems: PlaylistData[] = state.playlists.filter(
      (playlist) =>
        playlist.name !== undefined &&
        playlist.name !== null &&
        playlist.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );

    setPlaylists(searchedItems);
  };

  const showAll = () => {
    setPlaylists(state.playlists);
    setshowClearBtn(false);
  };

  const clearText = (e: any) => (e.target.value = "");

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="white" />}
      />
      <Input
        placeholder="Search in My Library"
        borderRadius={5}
        bgColor={"#181818"}
        border={"none"}
        focusBorderColor="none"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={showAll}
      />
      {showClearBtn && (
        <InputRightElement
          children={<CloseIcon color="white" onClick={clearText}/>}
        />
      )}
    </InputGroup>
  );
};
