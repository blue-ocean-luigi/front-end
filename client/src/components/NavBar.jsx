import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { logout } from './Auth';

export default function NavBar({setMainDisplay}) {
  return (
    <div>
      <ColorModeSwitcher position="absolute" top="0" right="0" zIndex={1}/>
      <Tabs position="absolute" top="0" left="0" w="100%" zIndex={0}>
        <TabList>
          <Tab>Something</Tab>
          <Tab>Thing 2</Tab>
          <Tab>Thing 3</Tab>
          <Tab>Thing 4</Tab>
          <Tab onClick={() => logout().then(() => setMainDisplay('login'))}>
            Log Out
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
