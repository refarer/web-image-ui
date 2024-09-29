import { Box, Container, Heading, Flex, IconButton, Tooltip, Text, Divider, Menu, MenuButton, MenuList, MenuItem, VStack } from "@chakra-ui/react";
import { FaUser, FaEdit } from "react-icons/fa";

interface NavbarProps {
  onEditProfile: () => void;
  pageName: string;
  userInfo: {
    name: string;
    jobTitle: string;
  } | null;
}

export const Navbar = ({ onEditProfile, pageName, userInfo }: NavbarProps) => {
  return (
    <Box
      as="nav"
      bg="gray.800"
      width="100%"
      color="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Flex mx="auto" alignItems="center" justifyContent="space-between">
        <Container maxWidth="full" px={4}>
          <Flex alignItems="center">
            <Heading size="md">App</Heading>
            <Divider orientation="vertical" height="20px" mx={4} />
            <Text fontSize="md" fontWeight="normal" color="gray.300">{pageName}</Text>
          </Flex>
        </Container>
        <Menu>
          <Tooltip label="Account Menu" placement="auto">
            <MenuButton
              as={IconButton}
              icon={<FaUser />}
              aria-label="Account Menu"
              variant="ghost"
              color="white"
            />
          </Tooltip>
          <MenuList>
            <VStack align="start" p={3}>
              <Text fontWeight="bold" color="gray.700">{userInfo?.name}</Text>
              <Text fontSize="sm" color="gray.700">{userInfo?.jobTitle}</Text>
            </VStack>
            <MenuItem color="gray.700" icon={<FaEdit />} onClick={onEditProfile}>
              Edit Profile
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};