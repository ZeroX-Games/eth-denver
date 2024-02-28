import { Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { IoGameController } from 'react-icons/io5';
import StateCard from '@ui/shared/StateCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const DetailAttributes = ({
  selectedFields,
  setSelectedFields,
  currentEvent,
  currentState,
  prevState,
  attributeSize,
}: any) => {
  const [hover, setHover] = useState<any>('HP');
  return (
    <VStack width="40%" gap={6} alignItems="start">
      <Text>
        {currentEvent === `Block ${attributeSize}`
          ? 'Latest State'
          : currentEvent}
      </Text>
      <SimpleGrid
        spacing={4}
        p={2}
        templateColumns="repeat(3, minmax(0, 1fr))"
        flexGrow={1}
        width={440}
        height={280}
        overflowY="scroll"
        overflowX="hidden"
        transition="scrollbar-color 0.2s"
        _hover={{
          scrollbarColor: `white black`,
        }}
      >
        {Object.keys(currentState).map((dataKey) => {
          if (dataKey === 'eventId' || dataKey === 'timestamp') return null;
          const checked = selectedFields.includes(dataKey);
          return (
            <StateCard
              key={dataKey}
              currentState={Number(currentState[dataKey])}
              lastState={Number(prevState[dataKey])}
              checked={checked}
              setSelectedFields={setSelectedFields}
              selectedFields={selectedFields}
              dataKey={dataKey}
              setHover={setHover}
              hover={hover}
            />
          );
        })}
      </SimpleGrid>
      <Link to="game-session">
        <Button
          width="120px"
          backgroundColor="white"
          color="black"
          _hover={{
            backgroundColor: '#2a8aff',
          }}
          leftIcon={
            <IoGameController
              style={{
                marginRight: '5px',
                fontSize: '20px',
              }}
            />
          }
        >
          Play
        </Button>
      </Link>
    </VStack>
  );
};

export default DetailAttributes;
