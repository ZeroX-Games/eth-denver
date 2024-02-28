import { Image, VStack, Box } from '@chakra-ui/react';
import bg from '@assets/gamebg.png';
import nav from '@assets/gamenav.png';
import { motion } from 'framer-motion';
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
      <Image
        src={nav}
        transform="scale(0.95)"
        position="absolute"
        top="-3%"
        as={motion.img}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.8,
          },
        }}
      />
      <Box w="100vw" position="relative">
        <GameLoadingScreen />
      </Box>
    </VStack>
  );
};

export default Game;
