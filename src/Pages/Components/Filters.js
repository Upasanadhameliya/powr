import React from 'react';
import { HStack, Menu, MenuButton, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


export default function Filters(){
    return(
        <HStack p={3}>
              <Menu variantColor="teal" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Sellers
                </MenuButton>
              </Menu>
              <Menu variantColor="teal" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Manufacturers
                </MenuButton>
              </Menu>
              <Menu variantColor="teal" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Number of Pins
                </MenuButton>
              </Menu>
              <Menu variantColor="teal" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Min Supply Voltage
                </MenuButton>
              </Menu>
              <Menu variantColor="teal" >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Max Supply Voltage
                </MenuButton>
              </Menu>
            </HStack>
    )
}