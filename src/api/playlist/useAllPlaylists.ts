import React, { useCallback } from "react";
import { useStateProvider } from "../../utils/DataStoreContext";
import axios from "axios";
import { PlaylistData } from "../../types/SpotifyApi";
import { reducerCases } from "../../utils/Constants";

export const useAllPlaylists = () => {
  const { state, dispatch } = useStateProvider();
  const { token } = state;

  const getPlaylists = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { items } = response.data;
      const playlists: PlaylistData[] = items.map((data: any) => {
        return {
          id: data.id,
          name: data.name,
          image: data.images.length > 0 ? data.images[0].url : "",
        };
      });
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        payload: playlists,
      });
      if (playlists.length > 0) {
        dispatch({
          type: reducerCases.SET_PLAYLIST_ID,
          payload: playlists[0].id,
        });
      }
    } catch (error) {
      //エラー処理
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { getPlaylists };
};
