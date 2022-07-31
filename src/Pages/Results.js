import React, { Component } from 'react'
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Button } from "@chakra-ui/react";
import { gql, useQuery } from '@apollo/client';
import jwtDecode from "jwt-decode"
import $ from 'jquery';
import Product from "./Components/Product.js"
import Search from "./Search.js"
import Navbar from "./Components/Navbar.js"

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

    const nx = require('../NexarClient/nexarClient.js')
    const clientId = process.env.NEXAR_CLIENT_ID ??
        (() => {throw new Error("Please set environment variable 'NEXAR_CLIENT_ID'")})()
    const clientSecret = process.env.NEXAR_CLIENT_SECRET ??
        (() => {throw new Error("Please set environment variable 'NEXAR_CLIENT_SECRET'")})()
    const nexar = new nx.NexarClient(clientId, clientSecret)

    function handleSubmit(e) {
        console.log(mpn)
        var query = `query PartSearch {
          supSearchMpn( q: $mpn ) {
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

        const response = nexar.query(query, {'mpn': mpn})
        const results = response?.data?.supSearchMpn?.results
    
        console.log(response)
        setFinal([])
        final2 = []
        setResponseOut(true)

        for (var i = 0; i < result.length; i++) {
            final2.push(<Product item={result[i]} />);
        }

        setFinal(final2)
        console.log(response.data.supSearchMpn.results)
    }

    React.useEffect(() => {
      const keyDownHandler = e => {
        console.log('User pressed: ', e.key);
        if (e.key === 'Enter') {
          handleSubmit();
        }
      };
      document.addEventListener('keydown', keyDownHandler);
      
      // /* global google */

      // google.accounts.id.initialize({
      //   client_id: "628053686539-fu3fu9cbtl6e16j6845ep49tn2uul1qs.apps.googleusercontent.com",
      //   callback: handleCallbackResponse
      // })

      // google.accounts.id.renderButton(
      //   document.getElementById("signInDiv"),
      //   {
      //     theme: "outline", size: "medium"
      //   }

      // )
      // //google.accounts.id.prompt();

      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, []);

    return (
        <>
          <Navbar />
          <VStack mt={10} mb={10} align={'center'}>
              <Input opacity="1 !important" id="firstName" p="1.2rem 0.8rem" w="80%" placeholder="MPN number" name="firstName" type="text" onChange={handleChange}/>
              <Button opacity="1 !important" id="submit" p="1.2rem 0.8rem" w="80%" variantColor="teal" onClick={handleSubmit}>Submit</Button>
          </VStack>
          {responseOut ? <Box > {final2} </Box> : null}
        </>
    )
}
