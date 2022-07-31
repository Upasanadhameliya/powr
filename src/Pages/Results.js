import React, { Component } from 'react'
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Button } from "@chakra-ui/react";
import { gql, useQuery } from '@apollo/client';
import jwtDecode from "jwt-decode"
import $ from 'jquery';
import Product from "./Components/Product.js"
import Search from "./Search.js"
import Navbar from "./Components/Navbar.js"
import axios from "axios";

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

      axios({
        method: 'POST',
        url: 'https://api.nexar.com/graphql',
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5NzI5QTkyRDU0RDlERjIyRDQzMENBMjNDNkI4QjJFIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTkzMDMzNTUsImV4cCI6MTY1OTM4OTc1NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5uZXhhci5jb20iLCJjbGllbnRfaWQiOiIxMDMwYmRmNy02ODI2LTRjZTQtOTBjYy00OWQwMWE5OTAzZmYiLCJjbGllbnRfYXBwbGljYXRpb25faWQiOiI4NmU1YzZkNy1lZmE5LTQxMmMtYmIyNy1mZGRmYzE1MWZjNGQiLCJqdGkiOiIzOEMxODBGNjEzRTVEN0FFNEJDQzIxMDNERTYwNzBCNSIsImlhdCI6MTY1OTMwMzM1NSwic2NvcGUiOlsic3VwcGx5LmRvbWFpbiJdfQ.lZ-4eosH15sTXr3nXeDcVJ9jjtOykSab5XpwwWqNlhCgSv1koqcBXtUZyF0j693_vCIMVsMiSJYS4Kz99XL1d2N5Rx1B92Zjdvmk81yRxDUv0T4KyiLjkZe1sayWfEqtGZxh6Mp3hAsPLO_r-bfH1bA6MPQpZY_kKuso1usZ9t5n0uNBeF2ce9vNieZ2mUo1WEx4Z-lBr6TRd0OZbDOKPcpXa1PZzPreAFYuwOhgac5mhDg32IyZW9zdz1qorJnv6plQlDxMav2Pb97d6wRK5d8CuwXdthHYq_s8daoiP6kfVC7cm4aqA4UcUlRv-kgKUC4jHCOprO-VkmhctJrbMw",
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