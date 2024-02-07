import React, { useContext } from 'react'
import Home from './Home'
import { StoreContext } from '../utils/DataStoreContext';
import Playlist from './Playlist';

export default function Body() {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <div>
      {
         state.isHome ? <Home/> : <Playlist/>
      }
    </div>
  )
}
