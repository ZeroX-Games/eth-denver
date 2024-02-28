import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaRegCopy } from 'react-icons/fa';
import { goldPFP } from '@/assets';

const NavUser = () => {
  const toast = useToast();

  return (
    <Menu>
      <Text color="white" fontWeight={600}>
        gold.eth
      </Text>
      <MenuButton>
        <Avatar bg="tokenBg.500" size="md" src={goldPFP} />
      </MenuButton>
      <MenuList backgroundColor="black" borderColor="gray.500" maxWidth="250px">
        <MenuItem
          backgroundColor="black"
          disabled
          cursor="default"
          closeOnSelect={false}
        >
          <HStack gap={4}>
            <Avatar bg="tokenBg.500" size="sm" src={goldPFP} />
            <VStack gap={1} alignItems="start">
              <Text textOverflow="ellipsis">gold.eth</Text>
              <HStack>
                <Text textOverflow="ellipsis" fontSize="sm" color="#AFAFAF">
                  0x76E32...c1C4D8
                </Text>
                <FaRegCopy
                  color="#AFAFAF"
                  cursor="pointer"
                  fontSize="sm"
                  onClick={() =>
                    toast({
                      title: 'Address Copied.',
                      description: 'You address has been copied.',
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    })
                  }
                />
              </HStack>
            </VStack>
          </HStack>
        </MenuItem>
        <MenuDivider borderColor="border.200" />
        <MenuItem
          backgroundColor="black"
          _hover={{ backgroundColor: 'hoverBg.200' }}
        >
          My Account
        </MenuItem>
        <MenuItem
          backgroundColor="black"
          _hover={{ backgroundColor: 'hoverBg.200' }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavUser;
