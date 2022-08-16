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
  IconButton
 } from "@chakra-ui/react";

import Product from "./Components/Product.js";
import Search from "./Search.js";
import Sidebar from "./Components/Sidebar.js";
import Filters from "./Components/Filters.js";
import Token from "./Components/tokenGen.js";

import jwtDecode from "jwt-decode"
import $ from 'jquery';
import axios from "axios";
import { SearchIcon, 
  
} from '@chakra-ui/icons';
import mixpanel from 'mixpanel-browser';

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

  mixpanel.init('50c1303b59691c86dded402ccccaed53', {debug: true}); 
  mixpanel.track('Sign up');

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
    window.location.reload();
  }

  function handleSubmit(e) {
    setPressed(true);
      console.log(mpn)
      var query = `query PartSearch {
        supSearchMpn(
          q:` + JSON.stringify(mpn) + `
        ) {
          hits
          results {
            part {
              bestImage{
                url
              }
              mpn
              manufacturerUrl
              manufacturer {
                name
                id
              }
              sellers(authorizedOnly: false) {
                company {
                  name
                  homepageUrl
                }
                isAuthorized
                offers {
                  prices{
                    price
                    quantity
                  }
                  clickUrl
                  inventoryLevel
                  sku
                  moq
                  packaging
                }
              }
            }
          }
        }
      }`;
      console.log(query)
      Token();
      axios({
        method: 'POST',
        url: 'https://api.nexar.com/graphql',
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          query: query,
          variables: {}
        })
      })
        .then(function (response) {
          console.log(response);
          result = response.data.data.supSearchMpn.results
          setFinal([])
          final2 = []
          setResponseOut(true)
          for (var i = 0; i < result.length; i++) {
              final2.push(<Product item={result[i]} />);
          }
          setPressed(false);
          setFinal(final2)
        })
        .catch(function (error) {
          console.log(error);
        });
  }



  return (
      <Box overflowX="hidden" w="100vw" h="100wh" bg="#f9fafb">
          <Sidebar />
          <Flex bg="#fff" ml="15%" p="1rem" boxShadow=" 0px 5px 5px 0px rgba(0,0,0,0.10)" justifyContent="space-between">
            <Box></Box>
            <Box w="50%" display="inline-flex">
            <Input opacity="1 !important" id="firstName" bg="#f4f5f7"
              p="1rem 0.8rem" placeholder="Search for parts" fontSize="1rem" fontWeight="500"
              name="firstName" type="text" onChange={event => setMpn(event.target.value)} />
            <Button onClick={handleSubmit}>Search</Button>
            </Box>
                {!loggedIn?
                <Box id="signInDiv"  ></Box>
                :<Flex align="center">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<Avatar size="sm" src={user.picture} />}
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
            {/* <Filters /> */}
        <Box ml="15%" p="1rem" align="center" >
            {responseOut ? <Text align="left" fontSize="2rem" fontWeight="600" color="#000" ml="5rem" p={2} pb={0}>Results</Text> : null}
            {responseOut ? <Box > {final2} </Box> : pressed ?<Spinner size='md' />:null}
        </Box>
      </Box>
  )
}