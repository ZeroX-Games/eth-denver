import { Image, HStack, Center, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import fightLogo from '@assets/fightlogo.png';
import { useEffect, useState } from 'react';
import { userGifs } from '@/utilities/gifLibrary';
import enemy from '@assets/enemy.gif';
import koLogo from '@assets/ko.png';
import GameOverModal from './GameOverModal';

const GameLoadingScreen = () => {
  const animationFrames = [0, 1, 0];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [gifIndex, setGifIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (isGameOver) {
        setIsGameOver(false);
        onOpen();
        return;
      }
      if (
        (e.key === 'a' || e.key === 'A' || e.key === 'ArrowRight') &&
        !isOpen
      ) {
        setGifIndex(1);
        return;
      }
      if (
        (e.key === 'd' || e.key === 'D' || e.key === 'ArrowLeft') &&
        !isOpen
      ) {
        setGifIndex(0);
        return;
      }
      if ((e.key === 'ArrowUp' || e.key === 'x' || e.key === 'X') && !isOpen) {
        setIsGameOver(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameOver, isOpen]);

  return (
    <>
      <Image
        as={motion.img}
        src={fightLogo}
        transform="scale(0.5)"
        position="absolute"
        left="22.5%"
        top="-200px"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: animationFrames,
          transition: {
            duration: 3,
          },
        }}
      />
      <HStack
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        px={10}
      >
        <Image src={userGifs[gifIndex]} transform="scale(0.7)" />
        <Image src={enemy} transform="scale(0.9)" />
      </HStack>
      {isGameOver && (
        <Center
          w="100vw"
          h="100vh"
          position="fixed"
          top="0px"
          left="0px"
          backgroundColor="blackAlpha.700"
        >
          <Image
            as={motion.img}
            src={koLogo}
            transform="scale(0.5)"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.9,
              transition: {
                duration: 1.2,
              },
            }}
          />
        </Center>
      )}
      <GameOverModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default GameLoadingScreen;
