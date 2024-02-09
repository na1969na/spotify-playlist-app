import React from "react";
import { VStack, Box, Button } from "@chakra-ui/react";

export const Login: React.FC = () => {
  const handleClick = () => {
    const clientId = "d2fc00e4d08146b4923d5957d0889ac5";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      "%20"
    )}
    &response_type=token&show_dialog=true`;
  };

  return (
    <VStack bg={"blue.900"} w={"100vw"} h={"100vh"}>
      <Box>
        <Box>PLAYLIST</Box>
        <Button borderRadius={40} onClick={handleClick}>
          Connect Spotify
        </Button>
      </Box>
    </VStack>
  );
};
