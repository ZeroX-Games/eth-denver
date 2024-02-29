import { GridItem, Heading, Text } from '@chakra-ui/react';
import socialMeebit from '@/assets/socialspacemeebit.png';
import GameDetails from './components/GameDetails';

const SocialSpace = () => {
  return (
    <GameDetails photo={socialMeebit} gamePath="../game-session">
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Likes
        </Heading>
        <Text textAlign="center">127</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Level
        </Heading>
        <Text textAlign="center">128</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Badges
        </Heading>
        <Text textAlign="center">16</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Championships
        </Heading>
        <Text textAlign="center">8</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Pokedex
        </Heading>
        <Text textAlign="center">156</Text>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" fontWeight="normal" color="gray.500">
          Charm
        </Heading>
        <Text textAlign="center">57</Text>
      </GridItem>
    </GameDetails>
  );
};

export default SocialSpace;
