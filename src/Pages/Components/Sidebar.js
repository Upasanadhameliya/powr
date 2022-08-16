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
import jwtDecode from "jwt-decode"

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    return (
        <Box>
            <VStack>
                <Flex
                    position="fixed"
                    left={0}
                    h="100vh"
                    bgColor="#fff"
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
                        <Image src="../images/powr.png" mt="1rem" mb="2rem"/>
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
            
            </Flex>
        </Flex>
      </VStack>
        </Box>
    )
}