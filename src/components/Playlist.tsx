import React, { useContext, useEffect } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import axios from "axios";
import { PlaylistDetail, TrackData } from "../types/SpotifyApi";
import { pageCases, reducerCases } from "../utils/Constants";
import { IconButton, Box, Image } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

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
        tracks: response.data.tracks.items.map((track: any) => ({
          id: track.track.id,
          name: track.track.name,
          artists: track.track.artists.map((artist: any) => artist.name),
          image: track.track.album.images[2].url,
          duration: track.track.duration_ms,
          album: track.track.album.name,
          context_uri: track.track.album.uri,
          track_number: track.track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, payload: selectedPlaylist });
    };
    getPlaylist();
  }, [state.token, dispatch, state.playlistId]);

  const clickBackBtn = () => {
    dispatch({ type: reducerCases.SET_PAGE, payload: pageCases.HOME_PAGE });
  };

  return (
    <div>
      <IconButton
        aria-label="Back to Home"
        icon={<ChevronLeftIcon />}
        onClick={clickBackBtn}
      />
      <Box>
        <Image src={state.playlistDetail.image} alt="playlist" />
        <Box>{state.playlistDetail.name}</Box>
        <Box>{state.playlistDetail.description}</Box>
        <Box>{state.playlistDetail.owner}</Box>
      </Box>
    </div>
  );
};
