import React from 'react';
import styled from 'styled-components';

export default function Login(){
  const handleClick = () => {
    const clientId = "d2fc00e4d08146b4923d5957d0889ac5";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played'
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join("%20")}
    &response_type=token&show_dialog=true`;
  };

  return(
    <Container>
      <img src='https://storage.googleapis.com/spotifynewsroom-jp.appspot.com/1/2020/12/Spotify_Logo_CMYK_Black.png'
      alt='spotify'
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap:5rem;
  img{
    height: 20vh;
    width: 80vh;
  }
  button {
    width: 20vw;
    padding:1rem 5rem;
    border-radius: 5rem;
    borer: none;
    background-color: black;
    color: #49f585;
    fontsize: 1.4rem;
    cursor: pointer;
  }
`;
