import { Box, TabPanels } from '@chakra-ui/react';

import GamePanel from '@ui/tabPanels/GamePanel';
import SocialPanel from '@ui/tabPanels/SocialPanel';
import CardPanel from '@ui/tabPanels/CardPanel';

const DetailNavPanel = () => {
  return (
    <Box>
      <TabPanels>
        <GamePanel />
        <CardPanel />
        <SocialPanel />
      </TabPanels>
    </Box>
  );
};

export default DetailNavPanel;
