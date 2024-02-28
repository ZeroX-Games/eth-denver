import { Flex, HStack, VStack } from '@chakra-ui/react';
import DetailImg from '@ui/detail/DetailImg';
import DetailInfo from '@ui/detail/DetailInfo';
import DetailNavs from '@ui/detailNav/DetailNavs';
import DetailNavPanel from '@ui/detailNav/DetailNavPanel';

const Pokemon = () => {
  return (
    <Flex>
      <VStack p={10} gap={16}>
        <HStack width="100%" gap={16} alignItems="flex-start">
          <DetailImg />
          <DetailInfo />
        </HStack>
        <DetailNavs>
          <DetailNavPanel />
        </DetailNavs>
      </VStack>
    </Flex>
  );
};

export default Pokemon;
