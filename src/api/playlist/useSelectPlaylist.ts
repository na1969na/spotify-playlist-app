import axios from "axios";
import React, { useCallback } from "react";
import { PlaylistDetail } from "../../types/SpotifyApi";
import { reducerCases } from "../../utils/Constants";
import { useStateProvider } from "../../utils/DataStoreContext";

export const useSelectPlaylist = () => {
  const { state, dispatch } = useStateProvider();
  const { token, playlistId, playlists } = state;

  const onSelectPlaylist = useCallback(async () => {
    try {
      const targetPlaylist = playlists.find(
        (playlist) => playlist.id === playlistId
      );

      if (!targetPlaylist) throw new Error();

      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

      dispatch({
        type: reducerCases.SET_PLAYLIST,
        payload: selectedPlaylist,
      });
    } catch {
      //エラー処理
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  return { onSelectPlaylist };
};
