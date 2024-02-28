import { Flex, Image } from '@chakra-ui/react';
import { pichuDetail } from '@/assets';

const DetailImg = () => {
  return (
    <Flex
      width="450px"
      height="450px"
      backgroundColor="tokenBg.500"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      boxShadow="0 0 0 1px #21262d, 0 16px 32px rgba(1,4,9,0.85)"
    >
      <Image src={pichuDetail} boxSize="250px" objectFit="cover" />
    </Flex>
  );
};

export default DetailImg;
