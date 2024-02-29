import { JSX } from 'react';
import {
  Center,
  Grid,
  HStack,
  Image,
  Link,
  Badge,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link as rLink } from 'react-router-dom';

interface GameDetailsProps {
  photo: string;
  gamePath: string;
  base?: boolean;
  children: JSX.Element[];
}

const GameDetails = ({ photo, gamePath, base, children }: GameDetailsProps) => {
  return (
    <HStack w="100%" alignItems="stretch">
      <Center
        backgroundColor="gray.500"
        flex={1}
        position="relative"
        borderRadius="18px"
      >
        <Image src={photo} borderRadius="18px" />
        {base && (
          <Badge position="absolute" top="15px" left="15px">
            Base
          </Badge>
        )}
      </Center>
      <VStack flex={1} w="100%" justifyContent="space-between" p={3}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={5}
          w="100%"
          justifyItems="center"
          flex={3}
        >
          {children}
        </Grid>
        <Link as={rLink} to={gamePath} flex={1}>
          <Button size="md" px={10}>
            Play
          </Button>
        </Link>
      </VStack>
    </HStack>
  );
};

export default GameDetails;
