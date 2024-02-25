import {
  Box,
  HStack,
  Image,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { TrackData } from "../types/SpotifyApi";

type Props = { isPlaylistCont: boolean; itemlist: TrackData[] };

export const ItemTable: React.FC<Props> = ({ isPlaylistCont, itemlist }) => {

  const msToMinutesAndSeconds = (ms: number) => {
    var minutes = Math.floor(ms / 60000);
    var seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  };

  return (
    <Box>
      <TableContainer>
        <Table variant="unstyled">
          {isPlaylistCont && (
            <Thead borderBottom={"solid 0.5px"} color={"blue.100"}>
              <Tr>
                <Th p={"0.5rem"} mr={5}>
                  Title
                </Th>
                <Th p={"0.5rem"}>Album</Th>
                <Th p={"0.5rem"}>Artists</Th>
                <Th p={"0.5rem"} textAlign={"end"}>
                  Duration
                </Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {itemlist.map((item: TrackData, index: number) => {
              return (
                <Tr _hover={{ bg: "whiteAlpha.200" }}>
                  <Td p={"0.5rem"} textAlign={"start"}>
                    <HStack>
                      <Image
                        src={item.image}
                        alt="track"
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius={3}
                      />
                      <Text>{item.name}</Text>
                    </HStack>
                  </Td>
                  <Td p={"0.5rem"}>{item.artists.join(",")}</Td>
                  <Td p={"0.5rem"}>{item.albumName}</Td>
                  <Td p={"0.5rem"} textAlign={"end"}>
                    {msToMinutesAndSeconds(item.duration)}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
