import React, { useContext, useEffect } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import axios from "axios";
import { PlaylistDetail, TrackData } from "../types/SpotifyApi";
import { reducerCases } from "../utils/Constants";
import {
  Box,
  Image,
  HStack,
  VStack,
  Avatar,
  Button,
  IconButton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ItemTable } from "./ItemTable";
import { FaPlay } from "react-icons/fa";
import { RecommendedTab } from "./RecommendedTab";
import { SearchTab } from "./SearchTab";

export const Playlist: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const getPlaylist = async () => {
      if(state.playlistId === "") return;
      
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${state.playlistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      const selectedPlaylist: PlaylistDetail = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        owner: response.data.owner.display_name,
        tracks: response.data.tracks.items.map((track: any) => ({
          id: track.track.id,
          name: track.track.name,
          artists: track.track.artists.map((artist: any) => artist.name),
          image: track.track.album.images[2].url,
          duration: track.track.duration_ms,
          albumName: track.track.album.name,
          context_uri: track.track.album.uri,
          track_number: track.track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, payload: selectedPlaylist });
    };
    getPlaylist();
  }, [state.token, dispatch, state.playlistId]);

  return (
    <Box>
      <Box color={"#f5f5f5"} ml={6} mr={6} mb={8}>
        <HStack>
          <Image
            src={state.playlistDetail.image}
            alt="playlist"
            w={230}
            borderRadius={5}
          />
          <VStack ml={4} alignItems={"flexStart"} fontSize={15}>
            <Box fontSize={80} fontWeight={"bold"}>
              {state.playlistDetail.name}
            </Box>
            <Box color={"blue.100"}>{state.playlistDetail.description}</Box>
            <HStack>
              <Avatar
                name={state.userInfo.userName}
                src={state.userInfo.userImage}
                size={"xs"}
              />
              <Box fontWeight={"semibold"}>{state.playlistDetail.owner}</Box>
              <Box>{state.playlistDetail.tracks.length} songs,</Box>
              <Box>総合時間</Box>
            </HStack>
          </VStack>
        </HStack>
        {state.playlistDetail.tracks.length > 0 && (
          <>
            <Button m={4} borderRadius={"50%"} h={50} w={50}>
              <FaPlay />
            </Button>
            <ItemTable
              isPlaylistCont={true}
              itemlist={state.playlistDetail.tracks}
            />
          </>
        )}
      </Box>
      <Box bgColor={"blackAlpha.700"} width="100wh" height="100vh">
        <Tabs position="relative" variant="unstyled" color={"blue.100"} isLazy>
          <TabList fontWeight={"bold"}>
            <Tab>Search</Tab>
            <Tab>Recommended</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.800"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <SearchTab />
            </TabPanel>
            <TabPanel>
              <RecommendedTab addedTracks={[]} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
