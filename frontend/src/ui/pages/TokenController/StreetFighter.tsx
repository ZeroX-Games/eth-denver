import { Box, Button, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import meebit from '@assets/meebit.gif';
import GameDetails from './components/GameDetails';

const StreetFighter = () => {
  return (
    <>
      <GameDetails photo={meebit} gamePath="../game-session" base>
        <GridItem>
          <Heading fontSize="xl" fontWeight="normal" color="gray.500">
            Games
          </Heading>
          <Text textAlign="center">12138</Text>
        </GridItem>
        <GridItem>
          <Heading fontSize="xl" fontWeight="normal" color="gray.500">
            Wins
          </Heading>
          <Text textAlign="center">4318</Text>
        </GridItem>
        <GridItem>
          <Heading fontSize="xl" fontWeight="normal" color="gray.500">
            League Points
          </Heading>
          <Text textAlign="center">14210</Text>
        </GridItem>
        <GridItem>
          <Heading fontSize="xl" fontWeight="normal" color="gray.500">
            Proficiency
          </Heading>
          <Text textAlign="center">2210</Text>
        </GridItem>
      </GameDetails>
      <VStack
        w="100%"
        alignItems="flex-start"
        backgroundColor="black"
        p={3}
        borderRadius="18px"
      >
        <Text color="gray.300">Block Number</Text>
        <Text color="gray.300" px={1}>
          Event Hash
        </Text>
        <Text color="gray.300" px={2}>
          TX Hash
        </Text>
        <Box px={3}>
          <Button>Base</Button>
        </Box>
      </VStack>
    </>
  );
};

export default StreetFighter;
