import { Card, CardBody, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { FaRightLong, FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { motion } from 'framer-motion';

// const speed = 8;

const StateCard = ({
  currentState,
  lastState,
  checked,
  setSelectedFields,
  selectedFields,
  dataKey,
  onHover,
}: any) => {
  const percentKeys = ['Win Rate', 'Critical Hit Rate', 'Productivity'];
  let latestPercent;
  if (percentKeys.includes(dataKey)) {
    latestPercent = `${currentState}%`;
  } else {
    latestPercent = `${currentState}`;
  }

  const hoverBorder = checked ? '2px #2a8aff solid' : '2px #404146 dashed';
  let color = 'white';
  if (currentState < lastState) {
    color = '#ff4d4f';
  } else if (currentState > lastState) {
    color = '#52c41a';
  }

  return (
    <Card
      key={dataKey}
      borderRadius={8}
      color="white"
      cursor="pointer"
      backgroundColor="tokenBg.200"
      pt={2}
      pb={2}
      width="150px"
      height="140px"
      border={checked ? '2px #2a8aff solid' : '2px #21262d dashed'}
      boxShadow={
        checked
          ? '0 0 0 2px #21262d, 0 3px 8px rgba(1,4,9,0.85)'
          : '0 3px 8px rgba(1,4,9,0.85)'
      }
      _hover={{
        border: hoverBorder,
      }}
      onClick={() => {
        if (checked) {
          setSelectedFields(
            selectedFields.filter(
              (field: any) => field !== dataKey.replace(/\s+/g, ''),
            ),
          );
        } else {
          setSelectedFields([...selectedFields, dataKey.replace(/\s+/g, '')]);
        }
      }}
      // transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <CardBody
        as={Flex}
        p={0}
        pb={0}
        alignItems="center"
        justifyContent="center"
        position="relative"
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
          <HStack>
            <Text fontSize={18} fontWeight={700} userSelect="none">
              {dataKey}
            </Text>
          </HStack>
          <HStack>
            <Text
              fontSize={18}
              fontWeight={700}
              color="#747285"
              userSelect="none"
            >
              {lastState}
              {percentKeys.includes(dataKey) && '%'}
            </Text>
            <FaRightLong />
            {onHover ? (
              <motion.div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  userSelect: 'none',
                }}
              >
                {latestPercent}
              </motion.div>
            ) : (
              <Text fontSize={18} fontWeight={700} userSelect="none">
                {currentState}
                {percentKeys.includes(dataKey) && '%'}
              </Text>
            )}
          </HStack>
          {currentState - lastState !== 0 && (
            <HStack>
              <Text
                fontSize={12}
                fontWeight={700}
                color={color}
                userSelect="none"
              >
                ({currentState - lastState > 0 ? '+' : ''}
                {currentState - lastState})
              </Text>
              {currentState - lastState > 0 ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StateCard;
