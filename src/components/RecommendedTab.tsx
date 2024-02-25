import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ItemTable } from "./ItemTable";

type Props = { addedTracks: string[] };

export const RecommendedTab: React.FC<Props> = ({ addedTracks }) => {
  return (
    <div>
      {addedTracks ? (
        <Box>
          <Text>プレイリストに曲を追加すると表示されるよ！</Text>
        </Box>
      ) : (
        <Tabs variant="soft-rounded" colorScheme="green" isLazy>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{/* <ItemTable isShowThead/> */}</TabPanel>
            <TabPanel>{/* <ItemTable /> */}</TabPanel>
            <TabPanel>{/* <ItemTable /> */}</TabPanel>
            <TabPanel>{/* <ItemTable /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
};
