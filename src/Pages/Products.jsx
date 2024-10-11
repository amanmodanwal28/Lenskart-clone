import React, { useReducer, useEffect, useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    HStack,
    VStack,
    Image,
    Spinner,
    SimpleGrid,
    Center,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Select,
} from "@chakra-ui/react";
import LeftFilterSection from "../Components/LeftFilterSection";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "REQUEST": {
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        }
        case "FETCH_SUCCESS": {
            return {
                ...state,
                data: payload,
                isLoading: false,
                error: false,
            };
        }
        case "FETCH_FAILED": {
            return {
                ...state,
                data: [],
                isLoading: false,
                error: true,
            };
        }
        case "Finally": {
            return {
                ...state,
                isLoading: false,
            };
        }
        default: {
            throw new Error();
        }
    }
};

const Products = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const products = state.data;
    const loading = state.isLoading;
    const error = state.error;

    const getData = (url) => {
        dispatch({ type: "REQUEST" });
        axios
            .get(url)
            .then((res) => {
                // console.log(res.data)
                dispatch({ type: "FETCH_SUCCESS", payload: res.data });
            })
            .catch((err) =>
                dispatch({ type: "FETCH_FAILED", payload: err.message })
            );
    };

    useEffect(() => {
        getData("https://lenskart-backend-ia3u.onrender.com/products");
    }, []);

    const handleSortChange = (e) => {
        let sortType = e.target.value;
        getData(
            `https://lenskart-backend-ia3u.onrender.com/products?_sort=price&_order=${sortType}`
        );
    };

    // console.log(products)
    return (
        <>
            <Navbar />

            <Box>
                <Box margin={"20px"}>
                    <Breadcrumb fontSize={"sm"}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Eyeglasses</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>

                <Image src="https://static1.lenskart.com/media/desktop/img/Feb23/style/plp/PLP%20Camapaign%20-%20WEB%20(6).jpg" />

                <Box
                    h={10}
                    marginBottom={"2px"}
                    marginTop={"20px"}
                    padding={"0 40px"}
                >
                    <HStack justifyContent={"space-between"}>
                        <Box></Box>
                        <Box w={{ lg: "200px" }}>
                            <Select
                                placeholder="Sort"
                                size={"sm"}
                                onChange={handleSortChange}
                            >
                                <option value="asc">Price: low to high</option>
                                <option value="desc">Price: high to low</option>
                            </Select>
                        </Box>
                    </HStack>
                </Box>

                <Center mb={"20px"}>
                    <Box w={"95%"}>
                        <Box h={"30px"} w={"100%"}></Box>
                        <Grid templateColumns={"80% 20%"}>
                            {loading ? (
                                <Box mt={"20vh"}>
                                    <Spinner size={"xl"} />
                                </Box>
                            ) : (
                                <HStack
                                    height="700px"
                                    overflow="scroll"
                                    alignItems="top"
                                    __css={{
                                        "&::-webkit-scrollbar": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    <Grid
                                        gridTemplateColumns={{
                                            lg: "repeat(3, 1fr)",
                                            md: "repeat(2, 1fr)",
                                            sm: "repeat(1, 1fr)",
                                            base: "repeat(1, 1fr)",
                                        }}
                                        gap={"20px"}
                                    >
                                        {products?.length &&
                                            products?.map((ele) => (
                                                <GridItem key={ele.id}>
                                                    <ProductCard data={ele} />
                                                </GridItem>
                                            ))}
                                    </Grid>
                                </HStack>
                            )}

                            <LeftFilterSection />
                        </Grid>
                    </Box>
                </Center>
            </Box>

            <Footer />
        </>
    );
};

export default Products;
