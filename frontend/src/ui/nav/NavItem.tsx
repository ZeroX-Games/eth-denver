import { NavLink } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

const NavItem = ({ name, to }: { name: string; to: string }) => {
  return (
    <NavLink to={to}>
      <Flex
        align="center"
        borderRadius={5}
        pr={3}
        pl={3}
        color="white"
        _hover={{
          color: 'gray.400',
        }}
      >
        <Text variant="emphasis" fontSize="16" fontWeight="700">
          {name}
        </Text>
      </Flex>
    </NavLink>
  );
};

export default NavItem;
