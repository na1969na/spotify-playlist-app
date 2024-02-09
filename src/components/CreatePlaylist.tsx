import React, { useContext } from "react";
import { StoreContext } from "../utils/DataStoreContext";

export const CreatePlaylist: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  
  return <div>{state.selectedPage}</div>;
};
