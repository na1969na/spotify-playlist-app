import React, { FC, createContext, useReducer } from 'react'
import { reducerCases } from './Constants';
import { PlaylistData } from '../type/SpotifyApi';

// useReducerで生成する「参照用のstate」の型
type DataStore = {
  token: string;
  playlists: PlaylistData[];
  isHome: boolean;
};

// dispatch関数の第2引数に渡す「action」の型
type ReducerAction = {
  type: string;
  token: string;
  playlists: PlaylistData[];
  isHome: boolean;
};

// createContext()のデフォルト値オブジェクトにasで割り当てる
type DataStoreContext = {
  state: DataStore;
  // dispatchの引数オブジェクトの型を、React.Dispatch<XXXXX> に定義する
  dispatch: React.Dispatch<ReducerAction>;
}

// reducer関数：更新用dispatchトリガーで、stateを更新する処理。
// 引数:   1.state 2.action(dispatch関数の引数)
// 戻り値: 更新後の新しいstate
const reducerFunc = (state: DataStore, action: ReducerAction) => {
  // action.typeの値で更新内容を切り替える。
  switch(action.type){
    case reducerCases.SET_TOKEN : {
      return{
        ...state, 
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS : {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    default: 
    return state;
  }
};

const initialState: DataStore = {
  token: "",
  playlists: [],
  isHome: true,
};

// childrenをpropsとして受け取るには明示的に型定義する
type providerProps = {
  children: React.ReactNode;
};

// createContextはReactフックではないため、コンポーネント外で使用可能
// as でオブジェクトの型チェックをクリアする
export const StoreContext = createContext({} as DataStoreContext);

export const DataStoreContextProvider: FC<providerProps> = (props) => {
  // useReducerで生成した「参照用state」と「更新用dispatch」を、contextに渡す
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
        {props.children}
    </StoreContext.Provider>
  );
};
