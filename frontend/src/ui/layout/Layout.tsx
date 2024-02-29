import { Flex } from '@chakra-ui/react';
import NavBar from '@ui/nav/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Flex
      direction="column"
      fontWeight="medium"
      backgroundColor="#121212"
      color="white"
      minHeight="100vh"
      width="100wh"
    >
      <NavBar />
      <Flex width="100%" justifyContent="center">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
