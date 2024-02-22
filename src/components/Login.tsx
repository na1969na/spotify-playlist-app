import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaSpotify } from "react-icons/fa";

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
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgGradient="linear(to-b, black, gray.700)"
    >
      <Box minW={{ base: "90%", md: "768px" }}>
        <Stack spacing={6} p="10.1rem" borderRadius={10} align={"center"}>
          <Heading color={"blue.300"} fontSize={100}>
            Fun Mix
          </Heading>
          <Text color={"white"} fontWeight={"bold"} fontSize={30}>
            with Spotify API.
          </Text>
          <Text color={"white"} fontWeight={"bold"}>
            Create Playlist!!
          </Text>
          <Button h={70} w={80} borderRadius={40} onClick={handleClick} leftIcon={<FaSpotify />}>
            Connect Spotify
          </Button>
        </Stack>
      </Box>
      <Box minW={{ base: "90%", md: "768px" }} color={"white"}>
        <Stack spacing={4} p="1.5rem" align={"center"} backgroundColor="#181818">
          <Stack justify="space-between" direction="row" align="center">
            <ButtonGroup variant="tertiary">
              <IconButton
                as="a"
                href="#"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="GitHub"
                icon={<FaGithub />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="fg.subtle">
            &copy; {new Date().getFullYear()} Nana Okamoto
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};
