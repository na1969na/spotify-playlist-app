import React from "react";
import {
  VStack,
  Box,
  Button,
  HStack,
  Center,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ImHeadphones } from "react-icons/im";

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
    <>
      <Box px={4} bgColor="black" h={100}>
        <Container maxW="container.lg">
          <Flex
            as="header"
            py="4"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading as="h1" fontSize="2xl" cursor="pointer">
              Next.js microCMS Blog
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Box bg="gray.700" w="100%" h="100%" p={4} color="white">
        <Button h={70} w={80} borderRadius={40} onClick={handleClick}>
          Connect Spotify
        </Button>
      </Box>
    </>

    // <VStack
    // justify={"center"}
    //   bg={"#e5e5f7"}
    //   w={"100vw"}
    //   h={"100vh"}
    //   opacity={0.7}
    //   // backgroundImage={
    //   //   "radial-gradient(circle at center center, #0a677c, #e5e5f7), repeating-radial-gradient(circle at center center, #0a677c, #0a677c 20px, transparent 40px, transparent 20px)"
    //   // }
    //   backgroundBlendMode={"multiply"}
    // >
    //   <VStack>
    //         <HStack
    //           mt={1}
    //           fontSize={100}
    //           color={"yellow.200"}
    //           fontWeight={"bold"}
    //         >
    //           <ImHeadphones />
    //           <Box>Fun Mix</Box>
    //         </HStack>
    //         <Button h={70} w={80} borderRadius={40} onClick={handleClick}>
    //           Connect Spotify
    //         </Button>
    //   </VStack>
    // </VStack>
  );
};
