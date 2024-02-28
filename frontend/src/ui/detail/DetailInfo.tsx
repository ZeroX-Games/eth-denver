import { VStack } from '@chakra-ui/react';
import DetailInfoTitle from '@ui/detail/DetailInfoTitle';
import DetailInfoUser from '@ui/detail/DetailInfoUser';
import DetailInfoPrice from '@ui/detail/DetailInfoPrice';

const DetailInfo = () => {
  return (
    <VStack alignItems="flex-start" gap={8}>
      <DetailInfoTitle />
      <DetailInfoUser />
      <DetailInfoPrice />
    </VStack>
  );
};

export default DetailInfo;
