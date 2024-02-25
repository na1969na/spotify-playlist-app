import React from 'react'
import { SearchInput } from './SearchInput'
import { ItemTable } from './ItemTable'

export const SearchTab: React.FC = () => {
  return (
    <div>
      <ItemTable isPlaylistCont={false} itemlist={[]}/>
    </div>
  )
}
