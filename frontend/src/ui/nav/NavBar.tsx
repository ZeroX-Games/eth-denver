import { Flex, HStack } from '@chakra-ui/react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import NavTitle from '@ui/nav/NavTitle';
import NavUser from '@ui/nav/NavUser';

const NavBar = () => {
  const { scrollY } = useScroll();
  const [isTop, setIsTop] = useState(true);

  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    const prevValue = scrollY.getPrevious();
    if (prevValue === 0 && latestValue > 0) {
      setIsTop(false);
    } else if (prevValue > 0 && latestValue === 0) {
      setIsTop(true);
    }
  });
  return (
    <Flex
      p={4}
      pl={10}
      pr={10}
      borderBottom="1px solid #383e44"
      gap={20}
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1000}
      backgroundColor={isTop ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)'}
      transition="background-color 0.3s ease-in-out"
      width="100%"
    >
      <HStack width="100%" justifyContent="space-between">
        <NavTitle to="main" />
        <HStack gap={6}>
          <NavUser />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
