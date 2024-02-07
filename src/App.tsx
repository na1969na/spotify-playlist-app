import React, { useContext, useEffect } from 'react';
import Login from './components/Login';
import { reducerCases } from './utils/Constants';
import Spotify from './components/Spotify';
import { StoreContext } from './utils/DataStoreContext';


function App() {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token);
      // useEffect関数内でAPIコール -> dispatchのpayloadに渡す
      dispatch({ type: reducerCases.SET_TOKEN, token: token, playlists: [], isHome: true});
    }
  },[state.token, dispatch]);

  return (
    <div>
      { state.token ? <Spotify/> : <Login/> }
    </div>
  );
}

export default App;
