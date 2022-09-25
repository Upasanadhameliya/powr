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
    useMediaQuery,
    Spacer
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
                    bgColor="#001B33"
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
                        <Image src="../images/powr.svg" mt="1rem" mb="2rem"/>
                        <NavItem navSize={navSize} icon="../images/search.svg" title="Part Search" weight={700}  active/>
                        <NavItem navSize={navSize} icon="../images/upload.svg" title="Upload BOM" weight={400}/>
                        <NavItem navSize={navSize} icon="../images/dollar-sign.svg" title="See Quotations" weight={400} />

                    
                        <Text fontSize="1rem" fontWeight={700} color="#fff" ml="1.1rem" mt="3rem">Help</Text>
                        <Divider width="90%" ml="1rem" borderColor="#292947" />

                        <NavItem navSize={navSize} icon="../images/help-circle.svg" title="FAQ" weight={400} />
                        <NavItem navSize={navSize} icon="../images/whatsapp.svg" title="Whatsapp Support" weight={400} />

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