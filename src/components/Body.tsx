import React, { useEffect } from "react";
import { useStateProvider } from "../utils/DataStoreContext";
import { TrackData } from "../types/SpotifyApi";
import {
  Box,
  Image,
  HStack,
  VStack,
  Avatar,
  Button,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { ItemTable } from "./ItemTable";
import { FaPlay } from "react-icons/fa";
import { RecommendedTab } from "./RecommendedTab";
import { SearchTab } from "./SearchTab";
import { useSelectPlaylist } from "../api/playlist/useSelectPlaylist";
import { SlOptions } from "react-icons/sl";

export const Body: React.FC = () => {
  const { state } = useStateProvider();
  const { playlistDetail, userInfo } = state;
  const { onSelectPlaylist } = useSelectPlaylist();

  useEffect(() => {
    onSelectPlaylist();
  }, [onSelectPlaylist]);

  const msToHoursMinSec = () => {
    const ms: number = playlistDetail.tracks.reduce(
      (acc: number, val: TrackData): number => {
        return acc + val.duration;
      },
      0
    );
    const hours: number = Math.floor(ms / 3600000);
    const minutes: number = Math.floor(ms / 60000);
    const seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return hours > 0
      ? hours + "h" + (minutes % 60) + "m"
      : minutes + "m" + (Number(seconds) < 10 ? "0" : "") + seconds + "s";
  };

  return (
    <Box>
      <Box color={"#f5f5f5"} ml={6} mr={6} mb={8}>
        <HStack>
          <Image
            src={playlistDetail.image}
            alt="playlist"
            w={230}
            borderRadius={5}
          />
          <VStack ml={4} alignItems={"flexStart"} fontSize={15}>
            <Box fontSize={80} fontWeight={"bold"} w={"800px"}>
              {playlistDetail.name}
            </Box>
            <Box
              color={"blue.100"}
              w={"500px"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              {playlistDetail.description}
            </Box>
            <HStack>
              <Avatar
                name={userInfo.userName}
                src={userInfo.userImage}
                size={"xs"}
              />
              <Box fontWeight={"semibold"}>{playlistDetail.owner}</Box>
              {playlistDetail.tracks.length > 0 && (
                <>
                  <Box>{playlistDetail.tracks.length} songs,</Box>
                  <Box>{msToHoursMinSec()}</Box>
                </>
              )}
            </HStack>
          </VStack>
        </HStack>
        {playlistDetail.tracks.length > 0 && (
          <>
            <HStack>
              <Button m={4} borderRadius={"50%"} h={50} w={50}>
                <FaPlay />
              </Button>
              <Popover closeOnBlur={false} placement="bottom">
                <PopoverTrigger>
                  <IconButton icon={<SlOptions />} aria-label={"Open menu"} bg={"none"}/>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent bg={"#181818"} color="white" border={"none"}>
                    <PopoverBody>
                      <Box _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}>Edit details</Box>
                      <Box _hover={{ cursor: "pointer", bg: "whiteAlpha.200" }}>Delete</Box>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>{" "}
            </HStack>
            <ItemTable isPlaylistCont={true} itemList={playlistDetail.tracks} />
          </>
        )}
      </Box>
      <Box bgColor={"blackAlpha.700"} width="100wh" height="100vh">
        <Tabs position="relative" variant="unstyled" color={"blue.100"} isLazy>
          <TabList fontWeight={"bold"}>
            <Tab>Search</Tab>
            <Tab>Recommended</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.800"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <SearchTab />
            </TabPanel>
            <TabPanel>
              <RecommendedTab addedTracks={[]} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
