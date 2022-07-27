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
              "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5NzI5QTkyRDU0RDlERjIyRDQzMENBMjNDNkI4QjJFIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTg5MjM4NjUsImV4cCI6MTY1OTAxMDI2NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5uZXhhci5jb20iLCJjbGllbnRfaWQiOiJjMTQ2MDQzOS03ODBmLTQ5MTYtOTlkYy03NGUxNWJjY2E4NDgiLCJjbGllbnRfYXBwbGljYXRpb25faWQiOiI5MDhhNmIxNS0yMGJkLTQzM2MtOGM3My1hYTU1ZGFkNDIxMjkiLCJqdGkiOiJFNjFFRkU4NzVFNEM1MUJERkY3RTEzMzdBRTYxMDNFOSIsImlhdCI6MTY1ODkyMzg2NSwic2NvcGUiOlsic3VwcGx5LmRvbWFpbiJdfQ.tJb05OuHDukFdJwC8t8mzdJyfhFIDpBS0GsAOtZFxRkF1YbFjJG4M9ELkpSW5xLStvwDA1xzNVQHypMwY79e_panvm0jzJC9pJq79OyitPef4vphz4Yagf1Biau6dKd9j9Fca1T4pRVvd34cgAfky8FO236xmpq2MrHujfB6nji0UFgyxX3kKmllsnK9lsr_HWR5oQekHhPABENuiMBJlFa9ozaiGpJyqo4TgIrUEA9gKucgQ1Hmsq_FLS1M4vclC3_aMfGGptBPvppF5P1bdi59up_F5FsEW2rpVW8jG7u-AHxkeu9V1dsT7Sc8xTVt64yRIgwlI-0Atl_LfaX6-A",
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              query: query,
              variables: {}
            })
          };

        $.ajax(settings).done(function (response) {
          console.log(response)
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
