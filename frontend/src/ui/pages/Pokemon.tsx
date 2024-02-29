import { Flex, HStack, VStack } from '@chakra-ui/react';
import DetailImg from '@ui/detail/DetailImg';
import DetailInfo from '@ui/detail/DetailInfo';
import DetailNavs from '@ui/detailNav/DetailNavs';
import DetailNavPanel from '@ui/detailNav/DetailNavPanel';
import { useState } from 'react';

const Pokemon = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Flex>
      <VStack p={10} gap={16}>
        <HStack width="100%" gap={16} alignItems="flex-start">
          <DetailImg />
          <DetailInfo />
        </HStack>
        <DetailNavs tabIndex={tabIndex} setTabIndex={setTabIndex}>
          <DetailNavPanel />
        </DetailNavs>
      </VStack>
    </Flex>
  );
};

export default Pokemon;
