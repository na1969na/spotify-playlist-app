import React, { useContext, useEffect } from "react";
import axios from "axios";
import { pageCases, reducerCases } from "../utils/Constants";
import { StoreContext } from "../utils/DataStoreContext";
import { PlaylistData } from "../types/SpotifyApi";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Card, CardBody, Image, Text } from "@chakra-ui/react";

export const Home: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

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
          description: data.description.startsWith("<a")
            ? ""
            : data.description,
          owner: data.owner.display_name,
          image: data.images[0].url,
        };
      });
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        payload: playlists,
      });
    };
    getPlaylistData();
  }, [dispatch, state.token]);

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

  return (
    <Flex gap={6} margin={10}>
      {state.playlists.map((playlist: PlaylistData) => {
        return (
          <>
            <Card
              key={""}
              id={playlist.id}
              maxW={60}
              maxH={80}
              bgColor={"#181818"}
              onClick={() => getPlaylistDetail(playlist.id)}
              _hover={{ cursor: 'pointer', opacity: '0.7' }}
            >
              <CardBody>
                <Image src={playlist.image} alt="playlist" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading fontSize={15} color={"#f5f5f5"}>
                    {playlist.name}
                  </Heading>
                  <Text color={"gray.500"}>{playlist.owner}</Text>
                </Stack>
              </CardBody>
            </Card>
          </>
        );
      })}
    </Flex>
  );
};
