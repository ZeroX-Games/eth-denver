import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';

const StyledTab = ({ text }: { text: string }) => {
  return (
    <Tab
      _selected={{
        color: 'white',
        bg: 'tokenBg.500',
        borderTop: '1px #21262d solid',
        borderLeft: '1px #21262d solid',
        borderRight: '1px #21262d solid',
      }}
      width="200px"
    >
      {text}
    </Tab>
  );
};

const DetailNavs = ({ children }: any) => {
  return (
    <Box width="100%" backgroundColor="black" borderRadius="lg">
      <Tabs variant="enclosed">
        <TabList justifyContent="center" gap={8} borderBottom={0}>
          <StyledTab text="Game" />
          <StyledTab text="Social" />
          <StyledTab text="Card" />
        </TabList>
        {children}
      </Tabs>
    </Box>
  );
};

export default DetailNavs;
