import { VStack, Box } from '@chakra-ui/react';
import bg from '@assets/gamebg.png';
import GameLoadingScreen from './components/GameLoadingScreen';

const Game = () => {
  return (
    <VStack
      bgImage={bg}
      w="100vw"
      h="100vh"
      bgSize="cover"
      bgRepeat="no-repeat"
      justifyContent="flex-end"
    >
      <Box w="100vw" position="relative">
        <GameLoadingScreen />
      </Box>
    </VStack>
  );
};

export default Game;
