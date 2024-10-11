/* eslint-disable no-unused-vars */
import {
    Box,
    Heading,
    HStack,
    Image,
    Divider,
    Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const CartCard = ({ data }) => {
    const { id, title, image, price } = data;
    useContext(CartContext);

    const handleRemoveItem = (e) => {
        e.preventDefault();
        // let removeItem = cartItem.filter((el)=>el.id != cart_id)
        // setCartItem([...cartItem, removeItem])
    };

    return (
        <Box
            w={"704px"}
            p={"10px"}
            borderRadius={"12px"}
            border={"1px solid lightgrey"}
            box-shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            margin={"10px"}
            _hover={{ cursor: "pointer" }}
            bgColor={"white"}
        >
            <HStack w={"638px"} h={"182px"} margin={"auto"} marginTop={"20px"}>
                <Box h={"180px"} p={"5px"}>
                    <Image src={image} h={"100%"} />
                </Box>
                <Box h={"182px"} w={"454px"} padding={"10px"} margin={"auto"}>
                    <Box marginBottom={"15px"}>
                        <HStack justifyContent={"space-between"}>
                            <Box w={"70%"}>
                                <Heading
                                    textAlign={"left"}
                                    as="h3"
                                    fontSize={"larger"}
                                    fontWeight={"light"}
                                >
                                    {title}
                                </Heading>
                            </Box>
                            <Box w={"20%"}>
                                <Heading
                                    textAlign={"right"}
                                    as="h3"
                                    fontSize={"larger"}
                                    fontWeight={"light"}
                                >
                                    Rs. {price}
                                </Heading>
                            </Box>
                        </HStack>
                    </Box>
                    <Divider variant={"dashed"} />
                    <Box margin={"15px 2px"}>
                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Heading
                                    as="h3"
                                    fontSize={"medium"}
                                    fontWeight={"light"}
                                >
                                    Final Price
                                </Heading>
                            </Box>
                            <Box>
                                <Heading
                                    textAlign={"right"}
                                    as="h3"
                                    fontSize={"medium"}
                                    fontWeight={"light"}
                                >
                                    Rs. {price}
                                </Heading>
                            </Box>
                        </HStack>
                    </Box>
                    <Divider variant={"dashed"} />
                    <Box marginTop={"15px"}>
                        <HStack>
                            <Button
                                colorScheme="black"
                                variant="link"
                                onClick={(e) => handleRemoveItem(e, id)}
                            >
                                Remove
                            </Button>
                            <Divider orientation="vertical" />
                            <Button colorScheme="black" variant="link">
                                Repeat
                            </Button>
                        </HStack>
                    </Box>
                </Box>
            </HStack>
        </Box>
    );
};

export default CartCard;
