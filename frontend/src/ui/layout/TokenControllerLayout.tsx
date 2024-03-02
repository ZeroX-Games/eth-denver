import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import meebitChar from '@/assets/meebitChar.png';
import { NavLink, Outlet } from 'react-router-dom';

const TokenControllerLayout = () => {
  const activeLink = {
    backgroundColor: 'black',
  };

  return (
    <VStack
      maxW="35%"
      m="auto"
      p={3}
      border="1px solid black"
      my={5}
      borderRadius="18px"
    >
      <HStack justifyContent="space-between" w="100%">
        <Text>Dashboard</Text>
        <Button display="flex" gap={4} size="md">
          <Text fontWeight="normal">0x12345...</Text>
          <Center backgroundColor="white" w="25px" h="25px" borderRadius="50%">
            U
          </Center>
        </Button>
      </HStack>
      <HStack w="100%" px={4}>
        <Text>Meebit </Text>
        <CheckCircleIcon />
        <Button>Base</Button>
      </HStack>
      <Text w="100%">Meebit #172</Text>
      <HStack w="100%" gap={12} alignItems="center">
        <Box borderColor="gray.500" borderWidth="15px">
          <Image src={meebitChar} w="250px" aspectRatio="1/1" />
        </Box>
        <VStack>
          <Text>121.9 ZeroX</Text>
          <Text>APY 5.3%</Text>
          <Button>Withdraw</Button>
        </VStack>
      </HStack>
      <VStack gap={0} w="100%">
        <HStack
          justifyContent="space-between"
          w="100%"
          gap={0}
          border="1px solid black"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            as={NavLink}
            flex={1}
            textAlign="center"
            backgroundColor="gray.500"
            py={2}
            _activeLink={activeLink}
            to=""
            color="white"
            end
          >
            Street Fighter 69
          </Link>
          <Link
            as={NavLink}
            flex={1}
            textAlign="center"
            backgroundColor="gray.500"
            py={2}
            borderX="1px solid black"
            _activeLink={activeLink}
            to="social-space"
            color="white"
          >
            Social Space
          </Link>
          <Link
            as={NavLink}
            flex={1}
            textAlign="center"
            backgroundColor="gray.500"
            py={2}
            _activeLink={activeLink}
            to="poke-card"
            color="white"
          >
            Poke Card
          </Link>
        </HStack>
        <VStack w="100%" backgroundColor="gray.200" p={3} gap={2}>
          <Outlet />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TokenControllerLayout;
