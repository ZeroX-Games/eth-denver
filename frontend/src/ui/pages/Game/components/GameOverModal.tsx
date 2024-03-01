import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Image,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import title from '@assets/overlaytitle.png';
import meebitProfile from '@assets/meebitProfile.png';
import doge from '@assets/doge.png';
import { useContext } from 'react';
import { RandomNumbersContext } from '@/utilities/context';
import { useNavigate } from 'react-router-dom';

const SummaryInfoRight = ({ attributeChanges, currentAttributes }: any) => {
  return Object.keys(attributeChanges).map((key: any) => {
    const delta = Number(attributeChanges[key]);
    const current = Number(currentAttributes[key]);

    const parsedDelta = delta > 0 ? `(+${delta})` : `(${delta})`;
    return (
      <VStack alignItems="flex-end">
        <Text display="flex" gap={2}>
          {current}{' '}
          {delta !== 0 && (
            <Text color={delta > 0 ? 'green' : 'red'}>{parsedDelta}</Text>
          )}
        </Text>
      </VStack>
    );
  });
};

const SummaryInfoLeft = ({ attributeChanges, currentAttributes }: any) => {
  return Object.keys(attributeChanges).map((key: any) => {
    const delta = Number(attributeChanges[key]);
    const current = Number(currentAttributes[key]);

    const parsedDelta = delta > 0 ? `(+${delta})` : `(${delta})`;
    return (
      <VStack alignItems="flex-start">
        <Text display="flex" gap={2}>
          {current}{' '}
          {delta !== 0 && (
            <Text color={delta > 0 ? 'green' : 'red'}>{parsedDelta}</Text>
          )}
        </Text>
      </VStack>
    );
  });
};

const GameOverModal = ({ isOpen, onClose }: any) => {
  const globalRandomNumber = useContext(RandomNumbersContext);
  console.log('globalRandomNumber', globalRandomNumber);
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent backgroundColor="blackAlpha.700">
        <ModalHeader display="flex" justifyContent="center">
          <Image src={title} transform="scale(0.5)" />
        </ModalHeader>
        <ModalBody>
          <HStack alignItems="strech" color="white">
            <VStack gap={1} alignItems="flex-start" flex={1}>
              <VStack gap={2} alignItems="flex-start">
                <Image src={doge} />
                <Text>Doge</Text>
                <Text color="whiteAlpha.700">relinquished.eth</Text>
              </VStack>

              <SummaryInfoLeft
                attributeChanges={globalRandomNumber.attributeChanges}
                currentAttributes={globalRandomNumber.currentAttributes}
              />
            </VStack>
            <VStack justifyContent="flex-end" flex={1}>
              {Object.keys(globalRandomNumber.attributeChanges).map((key) => {
                return <Text>{key}</Text>;
              })}
            </VStack>
            <VStack flex={1} justifyContent="flex-end" alignItems="flex-end">
              <VStack gap={2} alignItems="flex-end">
                <Image src={meebitProfile} />
                <Text>Meebit</Text>
                <Text color="whiteAlpha.700">gold.eth</Text>
              </VStack>
              <SummaryInfoRight
                attributeChanges={globalRandomNumber.attributeChanges}
                currentAttributes={globalRandomNumber.currentAttributes}
              />
            </VStack>
          </HStack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" my={3}>
          <Button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            size="lg"
            backgroundColor="whiteAlpha.800"
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameOverModal;
