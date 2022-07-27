import React, { Component } from 'react'
import { VStack, Box, Grid, Text, Image, Flex, HStack, Input, Button } from "@chakra-ui/react";
import { gql, useQuery } from '@apollo/client';
import $ from 'jquery';
import Product from "./Components/Product.js"

var result;
var final2 = [];

export default function Results() {
    const [mpn, setMpn] = React.useState("");
    const [final, setFinal] = React.useState([]);
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
                manufacturerUrl\
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
              "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5NzI5QTkyRDU0RDlERjIyRDQzMENBMjNDNkI4QjJFIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTg5MzA2NjQsImV4cCI6MTY1OTAxNzA2NCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5uZXhhci5jb20iLCJjbGllbnRfaWQiOiIxMDMwYmRmNy02ODI2LTRjZTQtOTBjYy00OWQwMWE5OTAzZmYiLCJjbGllbnRfYXBwbGljYXRpb25faWQiOiI4NmU1YzZkNy1lZmE5LTQxMmMtYmIyNy1mZGRmYzE1MWZjNGQiLCJqdGkiOiI3RDBGMDQ2MzI2OUEwQzc2RTMzN0NFQTc5MUM0N0FDRSIsImlhdCI6MTY1ODkzMDY2NCwic2NvcGUiOlsic3VwcGx5LmRvbWFpbiJdfQ.HVQ4TUt96juuT6ee3MxS1ZP3I705glUTpgqOJ5pEeNyrtPDJYGTh2ChxL2z8PRWWYETSiMqwoJURUHw6nhkrGaztXOKCuTwnWTsnLNltUFPvocYCN1wJ2TNDBMxHUv3rmVNvi7Dah1GSp8ympF7hI-GEv4eSLSUEweN_5ObPdLKk-zNA5l4A_l8jG9HK3ix2_vZ33Zr4fA8CQ3lJFZWMVO5POc7Uy3MVCUukjqJPpYtqynvLmG99PFjn-cILAkogljqqNNK5Y6jqbKk2bs-mQwUMQNhmw4S2U4oMC7tps9kzfTHhmICHo2R9H5udTjE_ZFwqrQ8WTDVM7-RfQwFEdQ",
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              query: query,
              variables: {}
            })
          };

        $.ajax(settings).then(function (response) {
            console.log(response)
            result = response.data.supSearchMpn.results
            setFinal([])
            final2 = []
            setResponseOut(true)
            for (var i = 0; i < result.length; i++) {
                final2.push(<Product item={result[i]} />);
            }
            setFinal(final2)
            console.log(response.data.supSearchMpn.results)
        })
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
        <>
            <VStack mt={10} mb={10} align={'center'}>
                <Input opacity="1 !important" id="firstName" p="1.2rem 0.8rem" w="80%" placeholder="MPN number" name="firstName" type="text" onChange={handleChange}/>
                <Button opacity="1 !important" id="submit" p="1.2rem 0.8rem" w="80%" variantColor="teal" onClick={handleSubmit}>Submit</Button>
            </VStack>
            {responseOut ? 
                <Box >
                  {final2}
                </Box>
                : null}
        </>
    )
}
