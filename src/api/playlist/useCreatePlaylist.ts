import React, { useCallback } from "react";
import { useStateProvider } from "../../utils/DataStoreContext";
import axios from "axios";
import {
  AddItemsRequestBody,
  CreatePlaylistRequestBody,
  CreatePlaylistRes,
} from "../../types/SpotifyApi";
import { reducerCases } from "../../utils/Constants";

export const useCreatePlaylist = () => {
  const { state, dispatch } = useStateProvider();
  const { token, playlistId, userInfo } = state;

  const createPlaylist = useCallback(
    async ({ name, description, image }: CreatePlaylistRequestBody) => {
      try {
        const createResponse = await axios.post<CreatePlaylistRes>(
          `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`,
          { name, description },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.put(
          `https://api.spotify.com/v1/playlists/${createResponse.data.id}/images`,
          { image },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({
          type: reducerCases.SET_PLAYLIST_ID,
          payload: createResponse.data.id,
        });
      } catch (error) {
        //エラー処理
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addItems = useCallback(
    async ({ uris }: AddItemsRequestBody) => {
      try {
        await axios.put(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        //エラー処理
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return { createPlaylist, addItems };
};
