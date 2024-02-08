import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import {Body} from "./Body";
import { StoreContext } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";
import { UserInfo } from "../types/SpotifyApi";
import axios from "axios";

export const Main: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });
      const userInfo: UserInfo = {
        userId: data.id,
        userName: data.display_name,
        userImage: data.images[0].url,
      };
      dispatch({
        type: reducerCases.SET_USER,
        payload: userInfo,
      });
    };
    getUserInfo();
  }, [dispatch, state.token]);

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body_contains">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgba(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;
