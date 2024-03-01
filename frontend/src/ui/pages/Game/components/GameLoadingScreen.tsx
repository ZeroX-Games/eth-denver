import {
  Image,
  HStack,
  Center,
  useDisclosure,
  Box,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import fightLogo from '@assets/fightlogo.png';
import { useEffect, useState } from 'react';
import koLogo from '@assets/ko.png';
import doge from '@assets/doge.gif';
import meebit from '@assets/meebit.gif';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp,
} from 'react-icons/fa';
import { GiWingedArrow } from 'react-icons/gi';
import { IconType } from 'react-icons';
import GameOverModal from './GameOverModal';

const MotionBox = motion(Box);

const iconArr = [
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  GiWingedArrow,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp,
];

const FallingIcon = ({
  icon,
  color,
  index,
}: {
  icon: IconType;
  color: string;
  index: number;
}) => {
  return (
    <MotionBox
      initial={{
        y: -700,
        x: -29,
      }}
      animate={{
        y: 8,
        opacity: 0.8,
      }}
      transition={{
        duration: Math.random() * 3 + 1,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: Math.random() * index + 1,
      }}
    >
      <Icon as={icon} color={color} w="60px" h="60px" position="absolute" />
    </MotionBox>
  );
};

const DanceController = ({
  color,
  direction,
}: {
  color: string;
  direction: string;
}) => {
  return (
    <VStack
      h="100vh"
      position="absolute"
      bottom="40px"
      left={direction === 'left' ? '80%' : undefined}
      right={direction === 'right' ? '80%' : undefined}
      justifyContent="flex-end"
    >
      <HStack
        backgroundColor="blackAlpha.800"
        p={2}
        px={5}
        gap={6}
        borderRadius="10px"
      >
        {iconArr.map((icon, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <VStack position="relative" key={index}>
              <FallingIcon icon={icon} color={color} index={index} />
              <Box>
                <Icon as={icon} color={color} w="60px" h="60px" />
              </Box>
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
};

const GameLoadingScreen = () => {
  const animationFrames = [0, 1, 0];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (isGameOver) {
        setIsGameOver(false);
        onOpen();
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
      <HStack w="100%" alignItems="flex-end" justifyContent="space-between">
        <Box position="relative">
          <Image
            as={motion.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={doge}
            height="600px"
            width="600px"
          />
          <DanceController color="#d10155" direction="left" />
        </Box>
        <Box position="relative">
          <Image
            as={motion.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={meebit}
            height="600px"
            width="600px"
          />
          <DanceController color="#0472bc" direction="right" />
        </Box>
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
