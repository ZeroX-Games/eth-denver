import {
  Box,
  Flex,
  HStack,
  TabPanel,
  TabPanels,
  VStack,
  Image,
} from '@chakra-ui/react';
import { pichuKombat } from '@/assets';
import DetailAttributes from '@ui/detailNav/DetailAttributes';
import StatusHistory from '@ui/chart/StatusHistory';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StyledPanel = ({ children }: { children: any }) => {
  return (
    <TabPanel
      backgroundColor="tokenBg.500"
      borderRadius="lg"
      justifyContent="center"
      boxShadow="0 0 0 1px #21262d, 0 3px 8px rgba(1,4,9,0.85)"
    >
      {children}
    </TabPanel>
  );
};

const data = [
  {
    eventId: 'Block 1',
    HP: 30,
    MP: 7,
    Games: 230,
    Wins: 120,
    Proficiency: 4,
    Attack: 34,
    Defense: 12,
  },
  {
    eventId: 'Block 2',
    HP: 8,
    MP: 40,
    Games: 231,
    Wins: 121,
    Proficiency: 41,
    Attack: 22,
    Defense: 13,
  },
  {
    eventId: 'Block 3',
    HP: 86,
    MP: 56,
    Games: 240,
    Wins: 127,
    Proficiency: 80,
    Attack: 62,
    Defense: 8,
  },
];

const DetailNavPanel = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['HP']);
  const [currentEvent, setCurrentEvent] = useState<string>('Block 1');
  const [stateByEvent, setStateByEvent] = useState<any>(null);
  const [prevStateByEvent, setPrevStateByEvent] = useState<any>(null);

  // const [realData, setRealData] = useState<any>(null);

  useEffect(() => {
    const select = data.find((state) => state.eventId === currentEvent);
    setStateByEvent(select);
    const currentId = Number(currentEvent.split(' ')[1]);
    if (currentId < 2) {
      setPrevStateByEvent(select);
    } else {
      const prevId = `Block ${Number(currentId) - 1}`;
      const prev = data.find((state) => state.eventId === prevId);
      setPrevStateByEvent(prev);
    }
  }, [currentEvent]);

  useEffect(() => {
    setCurrentEvent(`Block ${data.length}`);
  }, [data]);

  const fetchData = async () => {
    try {
      await axios.get('localhost:8000');
      // setRealData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <TabPanels>
        <StyledPanel>
          <VStack justifyContent="center" p={10} gap={14}>
            <HStack width="80%" gap={16} alignItems="start">
              <Flex
                width="300px"
                height="300px"
                justifyContent="center"
                alignItems="center"
                backgroundColor="tokenBg.500"
                borderRadius="lg"
                boxShadow="0 0 0 1px #30363d, 0 3px 8px rgba(1,4,9,0.85)"
              >
                <Image src={pichuKombat} width="200px" height="200px" />
              </Flex>
              {stateByEvent && (
                <DetailAttributes
                  selectedFields={selectedFields}
                  setSelectedFields={setSelectedFields}
                  currentEvent={currentEvent}
                  currentState={stateByEvent}
                  prevState={prevStateByEvent}
                  attributeSize={data.length}
                />
              )}
            </HStack>
            {/* {selectedFields.length > 0 && ( */}
            <StatusHistory
              selectedFields={selectedFields}
              setCurrentEvent={setCurrentEvent}
              data={data}
            />
            {/* )} */}
          </VStack>
        </StyledPanel>
        <StyledPanel>
          <p>two!</p>
        </StyledPanel>
        <StyledPanel>
          <p>three!</p>
        </StyledPanel>
      </TabPanels>
    </Box>
  );
};

export default DetailNavPanel;
