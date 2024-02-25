import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { pageCases, reducerCases } from "../utils/Constants";
import { Box, Text, HStack, Flex, Stack, Image } from "@chakra-ui/react";
import axios from "axios";
import { PlaylistData } from "../types/SpotifyApi";
import { SearchInput } from "./SearchInput";
import { VscLibrary } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    const getPlaylists = async () => {
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
          image: data.images[0].url,
        };
      });
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        payload: playlists,
      });
      setPlaylists(playlists);
    };
    getPlaylists();
    setPlaylists(state.playlists);

    if (state.playlists.length > 0) {
      getPlaylistDetail(state.playlists[0].id);
    }
  }, [dispatch, state.playlists, state.token]);

  const getPlaylistDetail = (id: string) =>
    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      payload: id,
    });

  const createPlaylist = () =>
    dispatch({
      type: reducerCases.SET_PAGE,
      payload: pageCases.CREATE_PAGE,
    });

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      bgColor={"blackAlpha.600"}
      color={"white"}
      fontWeight={"semibold"}
    >
      <Box p={"0.5rem"}>
        <Stack p="1rem" borderBottom={"0.1px solid"}>
          <Text>Fun Mix</Text>
        </Stack>
        <HStack p="1rem">
          <VscLibrary />
          <Text>My Library</Text>
        </HStack>
        <HStack
          borderRadius={5}
          p="0.5rem"
          mb={2}
          _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}
          onClick={createPlaylist}
        >
          <IoAdd size={"10%"} />
          <Text>Create a new playlist</Text>
        </HStack>
        <Stack>
          <SearchInput setPlaylists={setPlaylists} />
        </Stack>
        <Box height="59%" overflowY={"auto"} mt={3}>
          {playlists.map((playlist: PlaylistData) => {
            return (
              <HStack
                borderRadius={5}
                p="0.5rem"
                _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}
                onClick={() => getPlaylistDetail(playlist.id)}
              >
                <Image
                  src={playlist.image}
                  alt="Playlist"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius={3}
                />
                <Text>{playlist.name}</Text>
              </HStack>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
};
