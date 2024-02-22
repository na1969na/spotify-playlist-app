import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { pageCases, reducerCases } from "../utils/Constants";
import {
  Box,
  Text,
  HStack,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { PlaylistData } from "../types/SpotifyApi";
import { Search2Icon, AddIcon } from "@chakra-ui/icons";
import { SearchInput } from "./SearchInput";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState("");
  const [showPlaylists, setShowPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const { items } = response.data;
      const playlists: PlaylistData[] = items.map((data: any) => {
        return {
          id: data.id,
          name: data.name,
        };
      });
      setShowPlaylists(playlists);
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        payload: playlists,
      });
    };
    getPlaylistData();

    if (state.playlists.length > 0) {
      getPlaylistDetail(state.playlists[0].id);
    }
  }, [dispatch, state.playlists, state.token]);

  const getPlaylistDetail = (id: string) => {
    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      payload: id,
    });
    dispatch({
      type: reducerCases.SET_PAGE,
      payload: pageCases.DETAIL_PAGE,
    });
  };

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
        playlist.name !== undefined &&
        playlist.name !== null &&
        playlist.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setShowPlaylists(searchedItems);
  };

  const showAllPlaylists = () => setShowPlaylists(state.playlists);

  const createPlaylist = () =>
    dispatch({
      type: reducerCases.SET_PAGE,
      payload: pageCases.CREATE_PAGE,
    });

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
        <HStack>
          <Text>My Library</Text>
          <IconButton
            aria-label={"Create playlist"}
            icon={<AddIcon />}
            borderRadius={100}
            onClick={createPlaylist}
          />
        </HStack>
        <Stack>
          <SearchInput />
        </Stack>
        {showPlaylists.map((playlist: PlaylistData) => {
          return (
            <HStack
              p="1rem"
              borderRadius={10}
              cursor={"pointer"}
              onClick={() => getPlaylistDetail(playlist.id)}
              _hover={{ fontWeight: "bold" }}
            >
              <Text>{playlist.name}</Text>
            </HStack>
          );
        })}
      </Box>
    </Flex>
  );
};
