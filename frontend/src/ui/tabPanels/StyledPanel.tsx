import { TabPanel } from '@chakra-ui/react';

const StyledPanel = ({ children }: { children: any }) => {
  return (
    <TabPanel
      backgroundColor="#1b1b1b"
      borderRadius="lg"
      justifyContent="center"
      border="1px solid rgba(255, 255, 255, 0.12)"
    >
      {children}
    </TabPanel>
  );
};

export default StyledPanel;
