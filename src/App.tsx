import React, { useContext, useEffect } from 'react';
import {Login} from './components/Login';
import { reducerCases } from './utils/Constants';
import { Main } from './components/Main';
import { StoreContext } from './utils/DataStoreContext';

function App() {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token);
      // useEffect関数内でAPIコール -> dispatchのpayloadに渡す
      dispatch({ type: reducerCases.SET_TOKEN, payload: token});
    }
  },[state.token, dispatch]);

  return (
    <div>
      { state.token ? <Main/> : <Login/> }
    </div>
  );
}

export default App;
