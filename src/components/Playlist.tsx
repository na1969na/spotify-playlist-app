import React, { useContext, useEffect } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import axios from "axios";
import { PlaylistDetail, TrackData } from "../types/SpotifyApi";
import { reducerCases } from "../utils/Constants";
import {
  IconButton,
  Box,
  Image,
  HStack,
  VStack,
  Avatar,
} from "@chakra-ui/react";

export const Playlist: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const getPlaylist = async () => {
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
        total:response.data.total,
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

  const msToMinutesAndSeconds = (ms: number) => {
    var minutes = Math.floor(ms / 60000);
    var seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  };

  return (
    <Box color={"#f5f5f5"} ml={6} mr={6} mb={30}>
      <HStack>
        <Image
          src={state.playlistDetail.image}
          alt="playlist"
          w={230}
          borderRadius={5}
        />
        <VStack>
          <Box fontSize={20}>Playlist</Box>
          <Box fontSize={60}>{state.playlistDetail.name}</Box>
          <Box fontSize={20}>{state.playlistDetail.description}</Box>
          <HStack>
            <Avatar
              m={4}
              mr={6}
              name={state.userInfo.userName}
              src={state.userInfo.userImage}
            />{" "}
            <Box fontSize={20}>{state.playlistDetail.owner}</Box>
            <Box fontSize={20}>{state.playlistDetail.total}</Box>
            <Box fontSize={20}>総合時間</Box>
          </HStack>
        </VStack>
      </HStack>
      <HStack borderBottom={"0.1px solid"}>
        <Box>#</Box>
        <Box>Title</Box>
        <Box>Artist</Box>
        <Box>Album</Box>
        <Box>Time</Box>
      </HStack>
      {state.playlistDetail.tracks.map((track: TrackData, index: number) => {
        return (
          <HStack _hover={{ bg: "whiteAlpha.200" }} >
            <Box>{index + 1}</Box>
            <Image src={track.image} alt="track" />
            <Box>{track.name}</Box>
            <Box>{track.artists.join(",")}</Box>
            <Box>{track.albumName}</Box>
            <Box>{msToMinutesAndSeconds(track.duration)}</Box>
          </HStack>
        );
      })}
    </Box>
  );
};
