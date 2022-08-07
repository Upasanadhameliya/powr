import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Image,
    Box,
    VStack,
    useMediaQuery
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    const isSmall = useMediaQuery('(max-width: 800px)')
    return (
        <Box>
            <VStack>
                <Flex
                    position="fixed"
                    left={0}
                    h="100vh"
                    bgColor="#fff"
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                    w={navSize == "small" ? "0" : "15%"}
                    flexDir="column"
                    justifyContent="space-between"
                >
                    <Flex
                        p="5%"
                        flexDir="column"
                        w="100%"
                        alignItems={navSize == "small" ? "center" : "flex-start"}
                        as="nav"
                    >
                        <Image src="../images/powr.png" mt="1rem"/>
                        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" 
                        description="This is the description for the dashboard."  active/>
                        <NavItem navSize={navSize} icon={FiCalendar} title="Forms" />
                        <NavItem navSize={navSize} icon={FiUser} title="Cards" />
                        <NavItem navSize={navSize} icon={IoPawOutline} title="Charts" />
                        <NavItem navSize={navSize} icon={FiDollarSign} title="Buttons" />
                        <NavItem navSize={navSize} icon={FiBriefcase} title="Modals" />
                        <NavItem navSize={navSize} icon={FiSettings} title="Tables" />
                </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
      </VStack>
        </Box>
    )
}