import React, { Component } from 'react';
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Menu, Button, Spinner,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Link,
  InputGroup,
  Divider,
  Avatar,
  Heading,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputLeftElement,
  Stack,
  InputRightElement
 } from "@chakra-ui/react";

import Product from "./Components/Product.js";
import Sidebar from "./Components/Sidebar.js";
import Filters from "./Components/Filters.js";
import Token from "./Components/tokenGen.js";

import jwtDecode from "jwt-decode"
import $ from 'jquery';
import axios from "axios";
import { BellIcon, ChevronDownIcon, SearchIcon, 
} from '@chakra-ui/icons';

var result;
var final2 = [];
document.body.style = 'background: #f9fafb;';

export default function Results() {
  const [mpn, setMpn] = React.useState("");
  const [final, setFinal] = React.useState([]);
  const [responseOut, setResponseOut] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({})
  const [msg, setMsg] = React.useState(null);
  
  function handleCallbackResponse(response) {
      var userObject = jwtDecode(response.credential)
      localStorage.setItem("user", JSON.stringify(userObject))
      setLoggedIn(true)
      setUser(JSON.parse(localStorage.getItem("user")))
      this.window.location.reload();
  }

  React.useEffect(() => {
      /* global google */
       if (localStorage.getItem("user") === null) {
         google.accounts.id.initialize({
           client_id: "628053686539-fu3fu9cbtl6e16j6845ep49tn2uul1qs.apps.googleusercontent.com",
           callback: handleCallbackResponse
         })
   
         google.accounts.id.renderButton(
           document.getElementById("signInDiv"),
           {
             theme: "outline", size: "large"
           }
   
         )
       }
     }, [])

  if (localStorage.getItem("user") !== null && !loggedIn) {
    setLoggedIn(true)
    setUser(JSON.parse(localStorage.getItem("user")))
  }

  function logout(){
    localStorage.removeItem("user");
    setLoggedIn(false);
    this.window.location.reload();

  }

  function handleSubmit(){

  }

  return (
      <Box overflowY="hidden" w="100vw" h="100wh" bg="#F5F6F8" className="font-face-gm stop-scrolling">
          <Sidebar />
          <Flex bg="#fff" ml="15%" p="1rem" justifyContent="space-between">
            <Box w="50%" display="inline-flex">
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.500' />}
              />
              <Input opacity="1 !important" id="firstName" color="#11142D"
              mr="1rem" placeholder="Search for parts" fontSize="0.9rem"
              fontWeight="400" variant="unstyled"
              name="firstName" onChange={event => setMpn(event.target.value)} />
            </InputGroup>

            </Box>
                {!loggedIn?
                <Box id="signInDiv"  ></Box>
                :<Flex align="center">
                    <BellIcon color="#11142D" fontSize="1.3rem" mr={3} />
                    <Avatar size="sm" src={user.picture} />
                    <Text fontWeight="400" color="#11142D" ml={3} mr={2}>{user.name}</Text>
                    <Menu>
                        <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<ChevronDownIcon />}
                        variant='ghost'
                        />
                        <MenuList>
                        <MenuItem onClick={logout} 
                        variant="solid" variantColor="teal">
                            Profile
                        </MenuItem>
                        <MenuItem onClick={logout} 
                        variant="solid" variantColor="teal">
                            Settings
                        </MenuItem>
                        <MenuItem onClick={logout} 
                        variant="solid" variantColor="teal">
                            Logout
                        </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>}
          </Flex>
          <Box ml="15%" p="1rem" align="center" >
            <Image src="../images/Image-2.png" pt="1rem" pb="3rem" />
            <Text display="absolute" fontSize="1.2rem" 
            fontWeight="400" color="#000" pb="1rem">The Parts Planning & Sourcing Hub </Text>
            <Text fontSize="1.2rem" fontWeight="400" color="#11142D" pb="1rem">for Electronics</Text>
            </Box>

      </Box>
  )
}