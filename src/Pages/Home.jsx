import React from "react";
import Carousel from "../Components/Carousel";
import {
    Box,
    Container,
    Center,
    Image,
    Heading,
    Text,
    Flex,
    HStack,
    VStack,
    Button,
    Divider,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />

            <Box>
                <Box paddingTop={"5px"}></Box>
                <Carousel />
                <Box paddingTop={"5px"}></Box>
                <Image src="https://static1.lenskart.com/media/desktop/img/Feb23/23feb/PREMIUM%20BRANDS%20WEB.jpg" />
                <Box paddingTop={"5px"}></Box>
                <Box padding={"40px"}>
                    <Flex direction={{ lg: "row", md: "row", sm: "column" }}>
                        <Box
                            h={200}
                            w={234}
                            textAlign={{
                                lg: "left",
                                md: "center",
                                sm: "center",
                                base: "center",
                            }}
                            margin={"auto"}
                            // border={"1px solid red"}
                        >
                            <Heading as="h2" size={"2xl"} paddingTop={"25px"}>
                                Wear The Trend
                            </Heading>
                            <Box paddingTop={"5px"}></Box>
                            <Text>Our hottest collection</Text>
                        </Box>
                        <Box
                            h={200}
                            w={"90%"}
                            textAlign={"left"}
                            // border={"1px solid black"}
                            display={{
                                lg: "contents",
                                md: "none",
                                sm: "none",
                                base: "none",
                            }}
                        >
                            <HStack justifyContent={"space-evenly"}>
                                <VStack>
                                    <Box padding={"0px 20px"}>
                                        <Image
                                            src="https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg"
                                            w={"230px"}
                                        />
                                    </Box>
                                    <Heading as="h3" size={"md"}>
                                        Blend Edit
                                    </Heading>
                                    <Button bg={"#56B8C4"} color={"white"}>
                                        Explore
                                    </Button>
                                </VStack>
                                <VStack>
                                    <Box padding={"0px 20px"}>
                                        <Image
                                            src="https://static1.lenskart.com/media/desktop/img/Sep21/clipon.jpg"
                                            w={"230px"}
                                        />
                                    </Box>
                                    <Heading as="h3" size={"md"}>
                                        Clipon
                                    </Heading>
                                    <Button bg={"#56B8C4"} color={"white"}>
                                        Explore
                                    </Button>
                                </VStack>
                                <VStack>
                                    <Box padding={"0px 20px"}>
                                        <Image
                                            src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"
                                            w={"230px"}
                                        />
                                    </Box>
                                    <Heading as="h3" size={"md"}>
                                        Clubmaster
                                    </Heading>
                                    <Button bg={"#56B8C4"} color={"white"}>
                                        Explore
                                    </Button>
                                </VStack>
                                <VStack>
                                    <Box padding={"0px 20px"}>
                                        <Image
                                            src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"
                                            w={"230px"}
                                        />
                                    </Box>
                                    <Heading as="h3" size={"md"}>
                                        Cat-Eye
                                    </Heading>
                                    <Button bg={"#56B8C4"} color={"white"}>
                                        Explore
                                    </Button>
                                </VStack>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
                <Box paddingTop={"5px"}></Box>

                <Box>
                    <HStack w={"90%"} margin={"auto"}>
                        <Divider orientation="horizontal" />
                        <Heading
                            as="h3"
                            fontSize={"3xl"}
                            w={"1300px"}
                            fontFamily={"sans-serif"}
                        >
                            As Seen On Karan Johar
                        </Heading>
                        <Divider orientation="horizontal" />
                    </HStack>
                    <Box paddingTop={"30px"}></Box>
                    <Image src="https://static1.lenskart.com/media/desktop/img/Dec22/Web_banner.gif" />
                    <Box paddingTop={"30px"}></Box>
                </Box>
                <Box>
                    <HStack w={"90%"} margin={"auto"}>
                        <Divider orientation="horizontal" />
                        <Heading
                            as="h3"
                            fontSize={"3xl"}
                            w={"1300px"}
                            fontFamily={"sans-serif"}
                        >
                            Trending Sunglasses
                        </Heading>
                        <Divider orientation="horizontal" />
                    </HStack>
                    <Box paddingTop={"30px"}></Box>
                    <Image src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif" />
                    <Box paddingTop={"30px"}></Box>
                </Box>
                <Box>
                    <HStack w={"90%"} margin={"auto"}>
                        <Divider orientation="horizontal" />
                        <Heading
                            as="h3"
                            fontSize={"3xl"}
                            w={"1300px"}
                            fontFamily={"sans-serif"}
                        >
                            OJOS
                        </Heading>
                        <Divider orientation="horizontal" />
                    </HStack>
                    <Box paddingTop={"30px"}></Box>
                    <Image src="https://static1.lenskart.com/media/desktop/img/Feb23/23feb/ojos%20banner/ojos%20banner/web%20banner/ojos-web-1199.gif" />
                    <Box paddingTop={"30px"}></Box>
                </Box>
                <Box>
                    <HStack w={"90%"} margin={"auto"}>
                        <Divider orientation="horizontal" />
                        <Heading
                            as="h3"
                            fontSize={"3xl"}
                            w={"1300px"}
                            fontFamily={"sans-serif"}
                        >
                            FIND THE PERFECT FIT
                        </Heading>
                        <Divider orientation="horizontal" />
                    </HStack>
                    <Box paddingTop={"30px"}></Box>
                    <Grid
                        w={"80%"}
                        h={"1000px"}
                        templateRows="repeat(3,1fr)"
                        templateColumns={"repeat(2,1fr)"}
                        gap={4}
                        // border={"2px solid red"}
                        margin={"auto"}
                    >
                        <GridItem rowSpan={2} colSpan={1} h={"fit-content"}>
                            <Image src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/eye-square10.jpg" />
                        </GridItem>
                        <GridItem h={"fit-content"}>
                            <Image src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg" />
                        </GridItem>
                        <GridItem h={"fit-content"}>
                            <Image src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg" />
                        </GridItem>
                        <GridItem h={"fit-content"}>
                            <Image src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/power-sun-square.jpg" />
                        </GridItem>
                        <GridItem h={"fit-content"}>
                            <Image src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner03_TileDesktop.jpg" />
                        </GridItem>
                    </Grid>
                    <Box paddingTop={"30px"}></Box>
                </Box>
            </Box>

            <Footer />
        </>
    );
};

export default Home;
