import { Box, Image, Heading, VStack, Flex, Button, Divider, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import hideout from '../Assets/hideout.svg';


const ProductCard = ({ data }) => {
    const { id, brand, image, color, size, price } = data


    return (
        <RouterLink to={`/products/${id}`}>
            <Box
                key={id}
                border={'1px solid #EBEBEB'}
                padding={'16px'}
                borderRadius='7px'
                _hover={{ cursor: "pointer", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Box>
                    <Image src={image} />
                </Box>
                <Divider />
                <Box textAlign={'left'} marginTop={'5px'}>
                    <Stack>
                        <Heading as='h3' fontSize={'lg'}>{brand}</Heading>
                        <Heading as='h3' fontSize={'md'} fontWeight={'light'}>{size} - {color}</Heading>
                        <Heading as='h3' fontSize={'md'}>Rs. {price}</Heading>
                    </Stack>
                </Box>
                <Box textAlign={'left'} marginTop={'5px'} marginBottom={'8px'}>
                    <Heading as='h3' fontSize={'sm'} fontWeight={'light'}>BUY 1 GET 1 FREE</Heading>
                </Box>
                <Divider />
                <Box h={3}></Box>
                <Button colorScheme='teal' variant='ghost' width='200px'>Details</Button>
            </Box>
        </RouterLink>
    );

}

export default ProductCard