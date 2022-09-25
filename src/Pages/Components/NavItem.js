import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Image
} from '@chakra-ui/react'

export default function NavItem({ icon, title, description, active, navSize, weight}) {
    return (
        <Flex
            mt="0.5rem"
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#292947"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#292947" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex ml="0.5rem">
                            <Image src={icon} w="1.25rem" h="1.25rem" mt="0.1rem" />
                            <Text ml="0.6rem" display={navSize == "small" ? "none" : "flex"} fontWeight={weight}
                            color="#fff" fontSize="1rem">{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                </MenuList>
            </Menu>
        </Flex>
    )
}