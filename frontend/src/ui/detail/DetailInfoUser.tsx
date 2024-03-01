import { Avatar, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { goldPFP, meebitIcon, ethIcon } from '@/assets';

const DetailInfoUser = () => {
  return (
    <HStack gap={10}>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Network</Text>
        <HStack>
          <Avatar bg="tokenBg.500" size="sm" src={ethIcon} />
          <Text>Ethereum</Text>
        </HStack>
      </VStack>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Collection</Text>
        <HStack zIndex={9999}>
          <Tooltip label="0x5bffD74B364167Cd297F9016D225f2ff0231C15C">
            <Avatar
              bg="tokenBg.500"
              size="sm"
              src={meebitIcon}
              cursor="pointer"
            />
          </Tooltip>
          <Text color="linkTextColor.200">Meebit</Text>
        </HStack>
      </VStack>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Owned By</Text>
        <HStack zIndex={9999}>
          <Tooltip label="0x76E3274B364167Cd297F9016D225f2ff02c1C4D8">
            <Avatar bg="tokenBg.500" size="sm" src={goldPFP} cursor="pointer" />
          </Tooltip>
          <Text color="linkTextColor.200">gold.eth</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default DetailInfoUser;
