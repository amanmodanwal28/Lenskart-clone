import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    Heading,
    HStack,
    Image,
    Text,
    Button,
    Center,
    useToast,
} from "@chakra-ui/react";
import { CollapseEx } from "../Components/CollapseEx";
import { CartContext } from "../Context/CartContext";

const SingleProduct = () => {
    const { id } = useParams();
    const [productItem, setProductItem] = useState([]);
    const { cartItem, setCartItem } = useContext(CartContext);
    const toast = useToast();

    const handleCart = () => {
        setCartItem([...cartItem, productItem]);

        toast({
            title: "Product",
            description: "Item added SuccessFully.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    };

    useEffect(() => {
        axios
            .get(`https://lenskart-backend-ia3u.onrender.com/products/${id}`)
            .then((res) => setProductItem(res.data));
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }, [cartItem]);

    // console.log(cartItem)

    const {
        brand,
        category,
        color,
        image,
        price,
        productImages,
        rating,
        size,
        title,
    } = productItem;

    return (
        <>
            <Navbar />

            <Center>
                <Box key={id}>
                    <Box p={"10px"}>
                        <HStack
                            justifyContent={"space-between"}
                            padding={"5px 15px"}
                        >
                            <Box>
                                <Breadcrumb fontWeight="light" fontSize="sm">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            Eyeglasses
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            Brand
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            {brand}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="#">
                                            {title}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Box>
                            <Box>
                                <Text fontWeight={"thin"} fontSize={"xs"}>
                                    Problem in placing order ? Give a missed
                                    call 1800-111-111
                                </Text>
                            </Box>
                        </HStack>
                    </Box>

                    <Box w={"95%"} margin={"auto"} padding={"5px"}>
                        <Box
                            display={"flex"}
                            flexDirection={{
                                lg: "row",
                                md: "column",
                                sm: "column",
                                base: "column",
                            }}
                        >
                            <Box
                                w={{ lg: "940px", md: "800px", sm: "90%" }}
                                // border={"1px solid black"}
                            >
                                <Grid
                                    templateColumns={{
                                        lg: "repeat(2, 1fr)",
                                        md: "repeat(2, 1fr)",
                                        sm: "repeat(1, 1fr)",
                                        base: "repeat(1, 1fr)",
                                    }}
                                    gap={5}
                                >
                                    {productImages?.map((image) => (
                                        <Box
                                            margin={"auto"}
                                            h={{
                                                lg: "456px",
                                                md: "380px",
                                                sm: "380px",
                                                base: "380px",
                                            }}
                                            w={{
                                                lg: "456px",
                                                md: "380px",
                                                sm: "380px",
                                                base: "380px",
                                            }}
                                            border={"1px solid #eeeeee"}
                                        >
                                            <Image src={image} alt="" />
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>

                            <Box
                                w={"450px"}
                                textAlign={"left"}
                                padding={"20px"}
                            >
                                <Heading
                                    fontWeight={"medium"}
                                    color={"#ABABAB"}
                                    fontSize={"lg"}
                                    marginBottom={"10px"}
                                >
                                    {brand}
                                </Heading>
                                <Heading
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    marginBottom={"10px"}
                                >
                                    {title}
                                </Heading>
                                <Heading
                                    fontWeight={"medium"}
                                    color={"#ABABAB"}
                                    fontSize={"lg"}
                                    marginBottom={"10px"}
                                >
                                    Size: {size}
                                </Heading>
                                <Heading
                                    fontWeight={"medium"}
                                    color={"#ABABAB"}
                                    fontSize={"lg"}
                                    marginBottom={"10px"}
                                >
                                    Color: {color}
                                </Heading>
                                <Heading
                                    fontWeight={"bold"}
                                    color={"teal"}
                                    fontSize={"2xl"}
                                    marginBottom={"10px"}
                                >
                                    Rs.{price}
                                </Heading>
                                <Box>
                                    <Button
                                        w={"390px"}
                                        colorScheme="teal"
                                        variant="solid"
                                        marginBottom={"10px"}
                                        onClick={handleCart}
                                    >
                                        Buy Now
                                    </Button>
                                </Box>
                                <CollapseEx title={"Technical Information"} />
                                <CollapseEx title={"Visit Nearby Store"} />
                                <CollapseEx title={"Check Delivery Options"} />
                                <CollapseEx title={"Review(164)"} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Center>

            <Footer />
        </>
    );
};

export default SingleProduct;
