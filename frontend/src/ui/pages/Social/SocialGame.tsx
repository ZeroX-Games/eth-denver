import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import socialBg from '@/assets/socialbg.png';
import meebitProfileSocial from '@/assets/meebitProfileSocial.png';
import backArrow from '@assets/backArrow.png';
import { FaRegHeart, FaTwitterSquare, FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SocialGame = () => {
  const [isLiked, setIsLiked] = useState(false);

  const hadleClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Box position="relative" h="100vh" w="100vw">
      <Link to="../">
        <Image
          src={backArrow}
          position="absolute"
          top="40px"
          left="40px"
          zIndex={1400}
        />
      </Link>
      <Image src={socialBg} w="100vw" h="100vh" position="absolute" />
      <Card position="absolute" top="45%" left="40%" border="4px solid black">
        <CardHeader>
          <HStack gap={20}>
            <Heading>Gold</Heading>
            <Text>lvl: 128</Text>
            <HStack>
              {isLiked ? (
                <Icon
                  as={FaHeart}
                  color="red"
                  onClick={hadleClick}
                  cursor="pointer"
                />
              ) : (
                <Icon as={FaRegHeart} onClick={hadleClick} cursor="pointer" />
              )}
              <Text>{isLiked ? 128 : 127}</Text>
            </HStack>
          </HStack>
          <HStack>
            <Text fontSize="md" color="gray.600">
              gold.eth
            </Text>
            <HStack ml={12}>
              <FaTwitterSquare color="#30b6f0" width="30px" height="30px" />
              <Text>gold-eth</Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody position="relative">
          <VStack alignItems="flex-start" gap={1}>
            <Text fontWeight="semibold">Badges: 16</Text>
            <Text fontWeight="semibold">Championships: 8</Text>
            <Text fontWeight="semibold">Pokédex: 156</Text>
            <Text fontWeight="semibold">Charm: 57</Text>
          </VStack>
          <Image
            src={meebitProfileSocial}
            position="absolute"
            w="115px"
            bottom="0px"
            right="10px"
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default SocialGame;
