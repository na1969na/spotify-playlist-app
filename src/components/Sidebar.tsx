import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";
import {
  Box,
  Text,
  HStack,
  Flex,
  Stack,
  Image,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { CreatePlaylistRequestBody, PlaylistData } from "../types/SpotifyApi";
import { SearchInput } from "./SearchInput";
import { VscLibrary } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { useAllPlaylists } from "../api/playlist/useAllPlaylists";
import { useCreatePlaylist } from "../api/playlist/useCreatePlaylist";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useStateProvider();
  const { playlists } = state;
  const { getPlaylists } = useAllPlaylists();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [showPlaylists, setShowPlaylists] = useState<PlaylistData[]>([]);
  const { createPlaylist } = useCreatePlaylist();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(
    () => {
      getPlaylists();
      setShowPlaylists(playlists);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getPlaylistDetail = (id: string) =>
    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      payload: id,
    });

  const onClickCreate = () => {
    const requestBody: CreatePlaylistRequestBody = {
      name: name,
      description: description,
      image: image,
    };
    createPlaylist(requestBody);
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      bgColor={"blackAlpha.600"}
      color={"white"}
      fontWeight={"semibold"}
    >
      <Box p={"0.5rem"}>
        <Stack p="1rem" borderBottom={"0.1px solid"}>
          <Text>Fun Mix</Text>
        </Stack>
        <HStack p="1rem">
          <VscLibrary />
          <Text>My Library</Text>
        </HStack>
        <HStack
          borderRadius={5}
          p="0.5rem"
          mb={2}
          _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}
          onClick={onOpen}
        >
          <IoAdd size={"10%"} />
          <Text>Create a new playlist</Text>
        </HStack>
        <Stack>
          <SearchInput setPlaylists={setShowPlaylists} />
        </Stack>
        <Box height="59%" overflowY={"auto"} mt={3}>
          {showPlaylists.map((playlist: PlaylistData) => {
            return (
              <HStack
                borderRadius={5}
                p="0.5rem"
                _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}
                onClick={() => getPlaylistDetail(playlist.id)}
              >
                <Image
                  src={playlist.image}
                  alt="Playlist"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius={3}
                />
                <Text>{playlist.name}</Text>
              </HStack>
            );
          })}
        </Box>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bgColor={"#373737"} color={"white"}>
          <ModalHeader>Create a new playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Playlist name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Add a name"
                isRequired
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Add an optional description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bgColor="blue.100" mr={3} onClick={onClickCreate}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
