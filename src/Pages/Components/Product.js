import React from 'react'
import {Text, 
    Box, 
    VStack, 
    Image, 
    Link, 
    Grid, 
    Flex,  
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer} from '@chakra-ui/react'
import Seller from './Seller.js'

export default function Product(props) {
    var final2 = [];
    var final3 = [];
     for (var i = 0; i < props.item.part.sellers.length; i++) {
        if (props.item.part.sellers[i].offers[0].inventoryLevel > 0) {
            final2.push(<Seller item={props.item.part.sellers[i]} />);
        }
        else {
            final3.push(<Seller item={props.item.part.sellers[i]} />);
        }
     }
    return (
        <Box className="card" p={2} m={20} borderRadius={10}>
            {/* <Flex>
                <Image 
                src={props.item.part.bestImage === null?"../images/image-512.webp":props.item.part.bestImage.url} 
                alt="product" 
                width='10rem'/>
                <VStack spacing={2}>
                    <Text>{props.item.part.mpn}</Text>
                    <Text>{props.item.part.manufacturer.name}</Text>
                </VStack>
            </Flex> */}
            <TableContainer borderRadius={10}  border="2px #f5f6f7 solid">
                <Table>
                    <Thead bgcolor="#f9fafb">
                        <Tr>
                            <Th>Distributor</Th>
                            <Th>SKU</Th>
                            <Th>Stock</Th>
                            <Th>MOQ</Th>
                            <Th>Pkg</Th>
                            <Th></Th>
                            <Th>1</Th>
                            <Th>10</Th>
                            <Th>100</Th>
                            <Th>1000</Th>
                            <Th>10000</Th>
                        </Tr>
                    </Thead>
                    {final2}
                    {final3}
                    <TableCaption bgcolor="#f9fafb">
                        <Flex justifyContent={'space-around'} alignItems="center" position={'right'} >
                            <Link >Specs</Link>
                            <Link >Descriptions</Link>
                            <Link href={props.item.part.manufacturerUrl}>Manufacturer Page</Link>
                        </Flex>
                    </TableCaption>
                </Table>
            </TableContainer>
        </Box>
    )
}
