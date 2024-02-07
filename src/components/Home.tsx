import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";
import { StoreContext } from "../utils/DataStoreContext";
import { PlaylistData } from "../type/SpotifyApi";

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
        isHome: state.isHome
      });
    };
    getPlaylistData();
  }, [state.token, dispatch]);

  const [searchName, setSearchName] = useState("");

  return (
    <Container>
      <div>
        <input
          type="text"
          placeholder="playlist name"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <ul>
        {state.playlists
        .map((playlist: any, id: number) => {
          return (
            <div key={id}>
              <img src="playlist.image" alt="playlist"/>
              <span>{playlist.name}</span>
            </div>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
height:100%;
overflow:hidden;
ul{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height:52vh;
  max-height:100%;
  overflow:auto;
  &::-webkit-scrollbar{
    width: 0.7rem;
    &-thumb{
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  li{
    display:flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover{
      color: white;
    }
  }`;
