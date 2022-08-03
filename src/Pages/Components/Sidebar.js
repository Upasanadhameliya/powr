import React from 'react';
import { HStack, 
    Menu, 
    MenuButton, 
    Button, 
    VStack,
    Text,
    Image } from '@chakra-ui/react';
import {FaHome, FaWpforms, FaCards} from 'react-icons/fa'

export default function Sidebar(){
    return(
        <VStack bgColor="#1a1c23" color="#979798">
            <HStack p={3}>
                <FaHome  />                
                <Text>Dashboard</Text>
            </HStack>
            <HStack p={3}>
                <FaWpforms />
                <Text>Forms</Text>
            </HStack>
            <HStack p={3}>
                <Image />
                <Text>Cards</Text>
            </HStack>
            <HStack p={3}>
                <Image />
                <Text>Charts</Text>
            </HStack>
            <HStack p={3}>
                <Image />
                <Text>Buttons</Text>
            </HStack>
            <HStack p={3}>
                <Image />
                <Text>Modals</Text>
            </HStack>
            <HStack p={3}>
                <Image />
                <Text>Tables</Text>
            </HStack>
        </VStack>
    )
}