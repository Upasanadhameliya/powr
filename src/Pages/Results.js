import React, { Component } from 'react';
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Menu, Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Link
 } from "@chakra-ui/react";
import { FaBell } from 'react-icons/fa'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { gql, useQuery } from '@apollo/client';
import jwtDecode from "jwt-decode"
import $ from 'jquery';
import Product from "./Components/Product.js";
import Search from "./Search.js";
import Sidebar from "./Components/Sidebar.js";
import Filters from "./Components/Filters.js";
// import Sidebar from "./Components/Sidebar.js";
import axios from "axios";
import Token from "./Components/tokenGen.js";
import { ChevronDownIcon } from '@chakra-ui/icons';

var result;
var final2 = [];

export default function Results() {
  const [mpn, setMpn] = React.useState("");
  const [final, setFinal] = React.useState([]);
  var [responseOut, setResponseOut] = React.useState(false);

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential)
    localStorage.setItem("user", JSON.stringify(userObject))
  }

  function handleChange(event) {
      const { name, value } = event.target;
      setMpn(value);
  }


  function responseGoogle(response) {
    var userObject = jwtDecode(response.tokenId)
    console.log(userObject + " is the user object");
  }

  function handleSubmit(e) {
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
          setFinal(final2)
          console.log(response.data.supSearchMpn.results)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  React.useEffect(() => {
    const keyDownHandler = e => {
      console.log('User pressed: ', e.key);
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
      <Box overflowX="hidden" w="100vw" backgroundColor="#f9fafb" display="inline-block">
          <Sidebar />
          <Box bg="#fff" ml="15%" p="1rem" align="center" >
            <Input opacity="1 !important" id="firstName" 
              p="1rem 0.8rem" w="50%" placeholder="MPN number" fontSize="0.9rem"
              name="firstName" type="text" onChange={handleChange}
              />
            {/* <GoogleLogin
                as={'a'}
                w="100%"
                fontSize={'xl'}
                fontWeight={1000}
                variant={'link'}        
                clientId="628053686539-fu3fu9cbtl6e16j6845ep49tn2uul1qs.apps.googleusercontent.com"
                buttonText="Sign In"
                onSuccess={responseGoogle}
                onFailure={console.log("Failed to log in")}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                href={'#'}  
              /> */}
            {/* <Filters /> */}
            {responseOut ? <Box > {final2} </Box> : null}
        </Box>
      </Box>          
  )
}