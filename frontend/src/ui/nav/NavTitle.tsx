import { NavLink } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/react';
import { zeroXLogo } from '@/assets';

const NavTitle = ({ to }: { to: string }) => {
  return (
    <NavLink to={to}>
      <Flex align="center" color="white">
        <Image
          src={zeroXLogo}
          width={48}
          objectFit="cover"
          className="neon-effect"
        />
      </Flex>
    </NavLink>
  );
};

export default NavTitle;
