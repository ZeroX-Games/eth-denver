import { Flex, Image } from '@chakra-ui/react';
import { nftimage } from '@/assets';

const DetailImg = () => {
  return (
    <Flex
      width="450px"
      height="450px"
      backgroundColor="#1b1b1b"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      border="1px solid rgba(255, 255, 255, 0.12)"
    >
      <Image
        src={nftimage}
        boxSize="350px"
        objectFit="cover"
        borderRadius="lg"
      />
    </Flex>
  );
};

export default DetailImg;
