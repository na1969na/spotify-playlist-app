import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { StoreContext } from "../utils/DataStoreContext";
import { PlaylistData } from "../type/SpotifyApi";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Card, CardBody, Image, Text } from "@chakra-ui/react";

export default function Home() {
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
      const playlists: PlaylistData[] = items.map((data: any, id: string) => {
        return {
          id: data.id,
          name: data.name,
          description: data.description.startsWith("<a")
            ? ""
            : data.description,
          image: data.images[0].url,
          // tracks: data.tracks.items.map((track:any) => ({
          //   id: track.id,
          //   name: track.name,
          //   artists: track.artists.map((artist:any) => artist.name),
          //   image: track.album.images[2].url,
          //   duration: track.duration_ms,
          //   album: track.album.name,
          //   context_uri: track.album.uri,
          //   track_number: track.track_number,
          // })),
        };
      });
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        token: state.token,
        playlists: playlists,
        isHome: state.isHome,
        userInfo: state.userInfo,
      });
    };
    getPlaylistData();
  }, [state.token, dispatch]);

  const [searchName, setSearchName] = useState("");

  return (
    <div>
      <Stack direction="row">
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
            onChange={(e) => setSearchName(e.target.value)}
          />
        </InputGroup>
        <Avatar
          m={4}
          mr={6}
          name={state.userInfo.userName}
          src={state.userInfo.userImage}
        />{" "}
      </Stack>
      <Flex gap={6} margin={10}>
        {state.playlists.map((playlist: any, id: number) => {
          return (
            <>
              <Card maxW={60} maxH={80} bgColor={"#181818"}>
                <CardBody>
                  <Image
                    src={playlist.image}
                    alt="playlist"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading fontSize={15} color={"#f5f5f5"}>
                      {playlist.name}
                    </Heading>
                    <Text color={"#f5f5f5"}>作成者</Text>
                  </Stack>
                </CardBody>
              </Card>
            </>
          );
        })}
      </Flex>
    </div>
  );
}

// const Container = styled.div`
// height:100%;
// overflow:hidden;
// ul{
//   list-style-type: none;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 1rem;
//   height:52vh;
//   max-height:100%;
//   overflow:auto;
//   &::-webkit-scrollbar{
//     width: 0.7rem;
//     &-thumb{
//       background-color: rgba(255, 255, 255, 0.6);
//     }
//   }
//   li{
//     display:flex;
//     gap: 1rem;
//     cursor: pointer;
//     transition: 0.3s ease-in-out;
//     &:hover{
//       color: white;
//     }
//   }`;
