import { HStack, Text, VStack, Image } from '@chakra-ui/react';
import { logoIcon } from '@/assets';

const DetailInfoPrice = () => {
  return (
    <VStack
      backgroundColor="#1b1b1b"
      alignItems="start"
      p={6}
      width="550px"
      borderRadius="lg"
      mt={4}
      border="1px solid rgba(255, 255, 255, 0.12)"
    >
      <Text color="subTextColor.200">Current Price</Text>
      <HStack alignItems="center" gap={2}>
        <Image src={logoIcon} width="36px" height="36px" />
        <Text fontSize="xx-large">127.5 </Text>
      </HStack>
      {/* <HStack gap={6}> */}
      {/*  <Button */}
      {/*    mt={5} */}
      {/*    backgroundColor="#007BFF" */}
      {/*    color="white" */}
      {/*    width="140px" */}
      {/*    _hover={{ */}
      {/*      backgroundColor: '#2a8aff', */}
      {/*    }} */}
      {/*    leftIcon={<FaExchangeAlt />} */}
      {/*  > */}
      {/*    Transfer */}
      {/*  </Button> */}
      {/*  <Button */}
      {/*    mt={5} */}
      {/*    backgroundColor="transparent" */}
      {/*    color="white" */}
      {/*    border="1px #4a4f56 solid" */}
      {/*    width="120px" */}
      {/*    _hover={{ */}
      {/*      backgroundColor: '#3F444B', */}
      {/*    }} */}
      {/*  > */}
      {/*    Withdraw */}
      {/*  </Button> */}
      {/* </HStack> */}
    </VStack>
  );
};

export default DetailInfoPrice;
