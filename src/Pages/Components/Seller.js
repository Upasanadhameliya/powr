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
            <Td><Link href={props.item.company.homepageUrl === null? "#" :props.item.company.homepageUrl}>
                {props.item.company.name}</Link></Td>
            <Td><Link href={props.item.offers[0].clickUrl === null ? "#" : props.item.offers[0].clickUrl}>
                {props.item.offers[0].sku}</Link></Td>
            <Td><Text>{props.item.offers[0].inventoryLevel}</Text></Td>
            <Td><Text>{props.item.offers[0].moq}</Text></Td>
            <Td><Text>{props.item.offers[0].packaging}</Text></Td>
        </Tr>
    )
}
