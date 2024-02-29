import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';

const StyledTab = ({ text }: { text: string }) => {
  return (
    <Tab
      _selected={{
        color: 'white',
        bg: '#1b1b1b',
        border: '1px rgba(255, 255, 255, 0.12) solid',
        borderBottom: '1px solid #1b1b1b',
      }}
      width="200px"
      fontSize={18}
      fontWeight={500}
      zIndex={5000}
    >
      {text}
    </Tab>
  );
};

const DetailNavs = ({ tabIndex, setTabIndex, children }: any) => {
  return (
    <Box width="100%" borderRadius="lg">
      <Tabs
        variant="enclosed"
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
        }}
      >
        <TabList justifyContent="center" gap={8} borderBottom={0}>
          <StyledTab text="NFT Fighter" />
          <StyledTab text="NFT Card" />
          <StyledTab text="NFT Town" />
        </TabList>
        {children}
      </Tabs>
    </Box>
  );
};

export default DetailNavs;
