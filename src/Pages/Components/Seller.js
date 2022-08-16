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
        <Tr bgColor="#fff" >
            <Td><Link href={props.item.company.homepageUrl === null? "#" :props.item.company.homepageUrl} 
            fontWeight={600} fontSize="0.9rem" display="inline-flex">
                {props.item.offers[0].inventoryLevel > 0?<Text fontSize="0.5rem" mr="0.5rem">🟢</Text>:
                <Text fontSize="0.5rem" mr="0.5rem">🔴</Text>}{props.item.company.name}</Link></Td>
            <Td><Link href={props.item.offers[0].clickUrl === null ? "#" : props.item.offers[0].clickUrl} 
            fontWeight={400} fontSize="0.9rem" color="#4287ed">
                {props.item.offers[0].sku}</Link></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].inventoryLevel > 0 ?props.item.offers[0].inventoryLevel:"NA"}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].moq}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].packaging}</Text></Td>
            <Td></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].prices[0]?"$ "+props.item.offers[0].prices[0].price.toFixed(2):"-"}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].prices[1]?"$ "+props.item.offers[0].prices[1].price.toFixed(2):"-"}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].prices[2]?"$ "+props.item.offers[0].prices[2].price.toFixed(2):"-"}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].prices[3]?"$ "+props.item.offers[0].prices[3].price.toFixed(2):"-"}</Text></Td>
            <Td><Text fontSize="0.9rem">{props.item.offers[0].prices[4]?"$ "+props.item.offers[0].prices[4].price.toFixed(2):"-"}</Text></Td>

        </Tr>
    )
}
