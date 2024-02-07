import React, { useContext } from "react";
import { MdHomeFilled } from "react-icons/md";
import { MdMusicVideo } from "react-icons/md";
import { StoreContext } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";

export default function Sidebar() {
  const { state, dispatch } = useContext(StoreContext);
  
  const changeMenu = (isHome: boolean) => {
    dispatch({
      type: reducerCases.SET_PLAYLISTS,
      token: state.token,
      playlists: state.playlists,
      isHome: isHome,
      userInfo: state.userInfo
    });
  };
  return (
      <div className="top_links">
        <h1>Playlist</h1>
        <ul>
          <li onClick={() => changeMenu(true)}>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li onClick={() => changeMenu(false)}>
            <MdMusicVideo />
            <span>Create New Playlist</span>
          </li>
        </ul>
      </div>
  );
}

// const Container = styled.div`
//   background-color: black;
//   color: #b3b3b3;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 100%;
//   .top_links {
//     display: flex;
//     flex-direction: column;
//     .logo {
//       text-align: center;
//       margin: 1rem 0;
//     }
//     ul {
//       list-style: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       padding: 1rem;
//       li {
//         display: flex;
//         gap: 1rem;
//         cursor: pointer;
//         transition: 0.3s ease-in-out;
//         &:hover {
//           color: white;
//         }
//       }
//     }
//   }
// `;
