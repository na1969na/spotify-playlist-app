import React, { useContext } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { Playlist } from "./Playlist";
import { pageCases } from "../utils/Constants";
import { CreatePlaylist } from "./CreatePlaylist";

export const Body: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <>
    <CreatePlaylist />;
      {/* {(() => {
        if (state.selectedPage === pageCases.DETAIL_PAGE) {
          return <Playlist />;
        } else if (state.selectedPage === pageCases.CREATE_PAGE) {
          <CreatePlaylist />;
        }
      })()} */}
    </>
  );
};
