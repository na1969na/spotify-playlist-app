export type PlaylistData =  {
  id: string,
  name: string,
  description: string,
  owner: string,
  image: string,
};

export type PlaylistDetail = {
  id: string,
  name: string,
  description: string,
  owner: string,
  image: string,
  tracks: TrackData[]
}

export type TrackData =  {
  id: string,
  name: string,
  artists: string,
  image: string,
  duration: number,
  albumName: string,
  albumUri: string,
  trackNumber: number
};

export type UserInfo = {
  userId: string,
  userName: string,
  userImage: string,
}