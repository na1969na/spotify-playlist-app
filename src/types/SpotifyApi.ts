export type PlaylistData =  {
  id: string,
  name: string,
};

export type PlaylistDetail = {
  id: string,
  name: string,
  description: string,
  owner: string,
  image: string,
  total: number,
  tracks: TrackData[]
}

export type TrackData =  {
  id: string,
  name: string,
  artists: any,
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