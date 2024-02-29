import { SimpleGrid, Text, VStack, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import StateCard from '@ui/shared/StateCard';
import { useState } from 'react';
import { useFollowPointer } from '@/utilities/use-follow-pointer';

const DetailAttributes = ({
  selectedFields,
  setSelectedFields,
  currentEvent,
  currentState,
  prevState,
  attributes,
  eventSize,
}: any) => {
  const [onHover, setOnHover] = useState(false);
  const { x, y } = useFollowPointer();

  const bgColor = onHover ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0)';
  return (
    <VStack width="50%" gap={8} alignItems="start">
      <motion.div
        animate={{ x, y, backgroundColor: bgColor }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 120,
          restDelta: 0.001,
        }}
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '1000px',
          position: 'fixed',
          left: 0,
          top: 0,
          filter: 'blur(35px)',
          mixBlendMode: 'hard-light',
        }}
      />
      <Text fontSize={24} fontWeight={600}>
        {currentEvent === eventSize - 1
          ? 'Latest Status'
          : `Event #${currentEvent + 1}`}
      </Text>
      <Box
        width={520}
        height={300}
        backgroundColor="transparent"
        zIndex={100}
        onMouseEnter={() => {
          setOnHover(true);
        }}
        onMouseLeave={() => {
          setOnHover(false);
        }}
        overflowY="scroll"
        overflowX="hidden"
        transition="scrollbar-color 0.2s"
        _hover={{
          scrollbarColor: `white black`,
        }}
      >
        <SimpleGrid
          spacing={4}
          p={2}
          pt={0}
          templateColumns="repeat(3, minmax(0, 1fr))"
          flexGrow={1}
          width={520}
          height={280}
        >
          {attributes.map((attribute: string, index: any) => {
            const checked = selectedFields.includes(
              attribute.replace(/\s+/g, ''),
            );
            return (
              <StateCard
                key={attribute}
                currentState={Number(currentState[index])}
                lastState={Number(prevState[index])}
                checked={checked}
                setSelectedFields={setSelectedFields}
                selectedFields={selectedFields}
                dataKey={attribute}
                onHover={onHover}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default DetailAttributes;
