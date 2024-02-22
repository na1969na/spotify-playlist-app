import React, { useContext } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { Playlist } from "./Playlist";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SearchTab } from "./SearchTab";
import { RecommendedTab } from "./RecommendedTab";

export const CreatePlaylist: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      color={"white"}
      fontWeight={"semibold"}
    >
      <Playlist />
      <Box bgColor={"blackAlpha.700"} width="100wh" height="100vh">
        <Tabs position="relative" variant="unstyled" isLazy>
          <TabList>
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
              <RecommendedTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
