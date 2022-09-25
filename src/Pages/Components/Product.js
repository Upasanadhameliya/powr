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
    if (props.item.part.sellers.length <= 0){
        return null
    }
    return (
        <Box className="card" p="1.5rem" mt="0rem" mb="2rem" borderRadius={10} background="#fff">
            <Flex>
                <Image 
                src={props.item.part.bestImage === null?"../images/image-512.webp":props.item.part.bestImage.url} 
                alt="product" 
                width='10rem'/>
                <VStack spacing={2}>
                    <Text fontWeight={700} fontSize="0.8rem">{props.item.part.manufacturer.name.toUpperCase()} <Image display="inline" src="../images/external-link.svg" /></Text>
                    <Text>{props.item.part.mpn}</Text>
                </VStack>
            </Flex>
            <TableContainer borderRadius={10}  border="2px #f5f6f7 solid">
                <Table background="#f9fafb">
                    <Thead>
                        <Tr>
                            <Th fontWeight={700}>Distributor <Image display="inline" src="../images/external-link.svg" /></Th>
                            <Th fontWeight={700}>SKU <Image display="inline" src="../images/external-link.svg" /></Th>
                            <Th fontWeight={700}>Stock</Th>
                            <Th fontWeight={700}>MOQ</Th>
                            <Th fontWeight={700}>Pkg</Th>
                            <Th></Th>
                            <Th fontWeight={700}>1</Th>
                            <Th fontWeight={700}>10</Th>
                            <Th fontWeight={700}>100</Th>
                            <Th fontWeight={700}>1000</Th>
                            <Th fontWeight={700}>10000</Th>
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
