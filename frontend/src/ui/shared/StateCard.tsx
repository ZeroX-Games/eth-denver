import { Card, CardBody, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StateCard = ({
  currentState,
  lastState,
  checked,
  setSelectedFields,
  selectedFields,
  dataKey,
  setHover,
  hover,
}: any) => {
  const MotionVStack = motion(VStack);
  const MotionCardBody = motion(CardBody);

  return (
    <Card
      key={dataKey}
      borderRadius={8}
      color="white"
      backgroundColor="tokenBg.200"
      pt={2}
      pb={2}
      width="120px"
      height="120px"
      border={checked ? '2px #2a8aff solid' : '2px #21262d dashed'}
      boxShadow={
        checked
          ? '0 0 0 2px #21262d, 0 3px 8px rgba(1,4,9,0.85)'
          : '0 3px 8px rgba(1,4,9,0.85)'
      }
      onClick={() => {
        if (checked) {
          setSelectedFields(
            selectedFields.filter((field: any) => field !== dataKey),
          );
        } else {
          setSelectedFields([...selectedFields, dataKey]);
        }
      }}
      // transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <MotionCardBody
        as={Flex}
        p={0}
        pb={0}
        alignItems="center"
        justifyContent="center"
        position="relative"
        onHoverStart={() => setHover(dataKey)}
        transition={{ duration: 0.1 }}
      >
        {checked && (
          <Flex
            width="25px"
            height="25px"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            right="-8px"
            top="-18px"
            borderRadius="1000px"
            border="1px #21262d solid"
            backgroundColor="#161B22"
          >
            <FaCheck />
          </Flex>
        )}
        <VStack gap={2}>
          <Text fontSize={18} fontWeight={700}>
            {dataKey}
          </Text>
          <HStack>
            <Text fontSize={12} fontWeight={700}>
              {currentState}
            </Text>
            <Text fontSize={12} fontWeight={700}>
              {lastState}
            </Text>
          </HStack>
        </VStack>
      </MotionCardBody>
      {hover === dataKey && (
        <MotionVStack
          backgroundColor="rgba(255, 255, 255, 0.1)"
          position="absolute"
          inset={0}
          layoutId="card"
          boxShadow=""
        />
      )}
    </Card>
  );
};

export default StateCard;
