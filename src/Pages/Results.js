import React, { Component } from 'react'
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Button } from "@chakra-ui/react";
import { gql, useQuery } from '@apollo/client';
import $ from 'jquery';
import Product from "./Components/Product.js"

var final = [];
var result;

export default function Results() {
    const [mpn, setMpn] = React.useState("");
    var [responseOut, setResponseOut] = React.useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setMpn(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(mpn)
        var query = 'query PartSearch {\
          supSearchMpn(\
            q:'+ JSON.stringify(mpn) +'\
          ) {\
            hits\
            results {\
              part {\
                bestImage{\
                  url\
                }\
                mpn\
                manufacturer {\
                  name\
                  id\
                }\
                sellers(authorizedOnly: false) {\
                  company {\
                    name\
                    homepageUrl\
                  }\
                  isAuthorized\
                  offers {\
                    prices{\
                      price\
                      quantity\
                    }\
                    clickUrl\
                    inventoryLevel\
                    sku\
                    moq\
                    packaging\
                  }\
                }\
              }\
            }\
          }\
        }';
        console.log(query)
        var settings = {
            "url": "https://api.nexar.com/graphql",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5NzI5QTkyRDU0RDlERjIyRDQzMENBMjNDNkI4QjJFIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTg3MzYwODEsImV4cCI6MTY1ODgyMjQ4MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5uZXhhci5jb20iLCJjbGllbnRfaWQiOiJjMTQ2MDQzOS03ODBmLTQ5MTYtOTlkYy03NGUxNWJjY2E4NDgiLCJjbGllbnRfYXBwbGljYXRpb25faWQiOiI5MDhhNmIxNS0yMGJkLTQzM2MtOGM3My1hYTU1ZGFkNDIxMjkiLCJqdGkiOiJERDhEQUE4RUY0MzFENTY2QjY5NkI0Q0RBMkFERjI2NiIsImlhdCI6MTY1ODczNjA4MSwic2NvcGUiOlsic3VwcGx5LmRvbWFpbiJdfQ.ij16fFMsc_I1xkSbAk4fvnRmozJ04ev_nhBWyrq2qpU8y2L2LFuPSW_gcobkalBgnjqYHorO7bS9QNYUe3hSKNBhzXI26EAT00fQQBXw0u-rLXshbJPj2h_j1bqFmM9x3LcPzog5UiwwcUFpaPS7o-kHgpbD4yOiEzFyp9AQJXFTvRpZgVU3C-RFi_BWEacbIxzCFzPf1uYEKTdPuMWoFkDE0JHHz8uh7T0w6gaEoemu-aDAPxVMNrOaWAMyx6JJtfSITigLs9F1dawlOi89JSqo-MCoJO3ke-mXayk4yk3zqtTzvc1drTDFgb1L0Bb-Js6S-tSx84LTW6TwEV2zow",
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              query: query,
              variables: {}
            })
          };

        $.ajax(settings).done(function (response) {
            result = response.data.supSearchMpn.results
            final = []
            setResponseOut(true)
            for (var i = 0; i < result.length; i++) {
                final.push(<Product item={result[i]} />);
            }
            console.log(response.data.supSearchMpn.results)
        })
    }
    return (
        <>
            <VStack mt={10} mb={10} align={'center'}>
                <Input opacity="1 !important" id="firstName" p="1.2rem 0.8rem" w="80%" placeholder="enter your first name here" name="firstName" type="text" onChange={handleChange}/>
                <Button opacity="1 !important" id="submit" p="1.2rem 0.8rem" w="80%" variantColor="teal" onClick={handleSubmit}>Submit</Button>
            </VStack>
            {responseOut ? 
                <Box >
                  {final}
                </Box>
                : null}
        </>
    )
}
