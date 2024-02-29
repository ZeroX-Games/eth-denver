import { GridItem, Heading, Text } from '@chakra-ui/react';
import meebit from '@assets/pokecardmeebit.png';
import GameDetails from './components/GameDetails';

const PokeCard = () => {
  return (
    <GameDetails photo={meebit} gamePath="../game-session">
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Games
        </Heading>
        <Text textAlign="center">12138</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Win Rate
        </Heading>
        <Text textAlign="center">56%</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          HP
        </Heading>
        <Text textAlign="center">6</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Attack
        </Heading>
        <Text textAlign="center">6</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Defense
        </Heading>
        <Text textAlign="center">6</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Likes
        </Heading>
        <Text textAlign="center">128</Text>
      </GridItem>
    </GameDetails>
  );
};

export default PokeCard;
