import React, { useContext, useEffect } from "react";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Body } from "./Body";
import { StoreContext } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";
import { UserInfo } from "../types/SpotifyApi";
import axios from "axios";
import { Grid, GridItem } from "@chakra-ui/react";

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
    <Grid
      h={"100vh"}
      w={"100vw"}
      templateRows="88vh 12vh"
      templateColumns={"25vw 75vw"}
      bgGradient="linear(to-r, gray.900, cyan.900, gray.900)"
    >
      <GridItem>
        <Sidebar />
      </GridItem>
      <GridItem overflowY={"auto"}>
        <Navbar />
        <Body />
      </GridItem>
      <GridItem w={"100vw"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

// const Container = styled.div`
//   max-width: 100vw;
//   max-height: 100vh;
//   overflow: hidden;
//   display: grid;
//   grid-template-rows: 85vh 15vh;
//   .spotify_body {
//     display: grid;
//     grid-template-columns: 20vw 80vw;
//     height: 100%;
//     width: 100%;
//     background: linear-gradient(transparent, rgba(0, 0, 0, 1));
//     background-color: rgba(32, 87, 100);
//   }
//   .body {
//     height: 100%;
//     width: 100%;
//     overflow: auto;
//   }
// `;
