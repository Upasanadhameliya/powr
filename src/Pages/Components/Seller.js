import React, { Component } from 'react'
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

export default function Seller(props) {
    return (
        <Tr>
            {console.log(props.item)}
            <Td><Link href={props.item.company.homepageUrl}>{props.item.company.name}</Link></Td>
            <Td><Link src={props.item.offers.clickUrl}>{props.item.offers[0].sku}</Link></Td>
            <Td><Text>{props.item.offers[0].inventoryLevel}</Text></Td>
            <Td><Text>{props.item.offers[0].moq}</Text></Td>
            <Td><Text>{props.item.offers[0].packaging}</Text></Td>
        </Tr>
    )
}
