import { Avatar, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { baseIcon, goldPFP, pokemonIcon } from '@/assets';

const DetailInfoUser = () => {
  return (
    <HStack gap={10}>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Network</Text>
        <HStack>
          <Avatar bg="tokenBg.500" size="sm" src={baseIcon} />
          <Text>Base</Text>
        </HStack>
      </VStack>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Collection</Text>
        <HStack>
          <Avatar bg="tokenBg.500" size="sm" src={pokemonIcon} />
          <Tooltip label="0x5bffD74B364167Cd297F9016D225f2ff0231C15C">
            <Text color="linkTextColor.200" cursor="pointer">
              Pokemon
            </Text>
          </Tooltip>
        </HStack>
      </VStack>
      <VStack alignItems="start">
        <Text color="subTextColor.200">Owned By</Text>
        <HStack>
          <Avatar bg="tokenBg.500" size="sm" src={goldPFP} />
          <Tooltip label="0x76E3274B364167Cd297F9016D225f2ff02c1C4D8">
            <Text color="linkTextColor.200" cursor="pointer">
              gold.eth
            </Text>
          </Tooltip>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default DetailInfoUser;
