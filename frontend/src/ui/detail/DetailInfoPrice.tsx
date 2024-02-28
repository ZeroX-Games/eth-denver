import { HStack, Text, VStack } from '@chakra-ui/react';

const DetailInfoPrice = () => {
  return (
    <VStack
      backgroundColor="tokenBg.500"
      alignItems="start"
      p={6}
      width="550px"
      borderRadius="lg"
      mt={4}
      boxShadow="0 0 0 1px #21262d, 0 16px 32px rgba(1,4,9,0.85)"
    >
      <Text color="subTextColor.200">Current Price</Text>
      <HStack alignItems="end" gap={5}>
        <Text fontSize="xx-large">127.5 ZeroX</Text>
        <Text mb="6px" color="green.400">
          APY: 5.3%
        </Text>
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
