import React, { useContext } from "react";
import { Home } from "./Home";
import { StoreContext } from "../utils/DataStoreContext";
import { Playlist } from "./Playlist";
import { pageCases } from "../utils/Constants";

export const Body: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <>
      {(() => {
        if (state.selectedPage === pageCases.HOME_PAGE) {
          return <Home />;
        } else if (state.selectedPage === pageCases.DETAIL_PAGE) {
          return <Playlist />;
        } else {
        }
      })()}
    </>
  );
};
