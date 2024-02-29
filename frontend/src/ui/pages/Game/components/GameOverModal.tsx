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
            <VStack gap={4} alignItems="flex-start" flex={1}>
              <VStack gap={2} alignItems="flex-start">
                <Image src={doge} />
                <Text>Doge</Text>
                <Text color="whiteAlpha.700">relinquished.eth</Text>
              </VStack>

              <VStack alignItems="flex-start">
                <Text display="flex" gap={2}>
                  12138 <Text color="green">(+1)</Text>
                </Text>
                <Text>2410</Text>
                <Text display="flex" gap={2}>
                  13281 <Text color="red">(-12)</Text>
                </Text>
                <Text display="flex" gap={2}>
                  2322 <Text color="green">(+2)</Text>
                </Text>
              </VStack>
            </VStack>
            <VStack justifyContent="flex-end" flex={1}>
              <Text>Total Games</Text>
              <Text>Wins</Text>
              <Text>League Points</Text>
              <Text>Proficiency</Text>
            </VStack>
            <VStack flex={1} justifyContent="flex-end">
              <VStack gap={2} alignItems="flex-end">
                <Image src={meebitProfile} />
                <Text>Meebit</Text>
                <Text color="whiteAlpha.700">gold.eth</Text>
              </VStack>
              <VStack alignItems="flex-end" w="100%">
                <Text display="flex" gap={2}>
                  12138 <Text color="green">(+1)</Text>
                </Text>
                <Text display="flex" gap={2}>
                  4318 <Text color="green">(+1)</Text>
                </Text>
                <Text display="flex" gap={2}>
                  14210 <Text color="green">(+10)</Text>
                </Text>
                <Text display="flex" gap={2}>
                  2210 <Text color="green">(+8)</Text>
                </Text>
              </VStack>
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
