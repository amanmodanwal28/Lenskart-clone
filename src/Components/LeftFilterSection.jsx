import {
    Heading,
    VStack,
    Image,
    Text,
    Box,
    Grid,
    Checkbox,
    CheckboxGroup,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CollapseEx } from "./CollapseEx";
import { FilterContext } from "../Context/FilterContext";

const LeftFilterSection = () => {
    const { filterValue, setFilterValue } = useContext(FilterContext);

    // const handleChangeFilter = (value) => {
    //     if (filterValue.include(value)) {
    //         setFilterValue(filterValue.filter((filter) => filter !== value));
    //     } else {
    //         setFilterValue([...filterValue, value]);
    //     }
    // };

    // console.log(filterValue);
    return (
        <Box
            display={{
                lg: "contents",
                md: "none",
                sm: "none",
                base: "none",
            }}
        >
            <VStack>
                {/* <Box>
                    <Heading
                        as="h4"
                        size={"md"}
                        fontWeight={"medium"}
                        textAlign="left"
                    >
                        FRAME COLOR
                    </Heading>
                    <Box h={"2"}></Box>
                    <Box
                        padding={"4px"}
                        color={"grey"}
                        w={208}
                        h={200}
                        overflowY="scroll"
                    >
                        <VStack align={"left"}>
                            <Checkbox
                                color="#9D9D9D"
                                value={"Tortoise"}
                                isChecked={filterValue.push("Tortoise")}
                                onChange={() => handleChangeFilter("Tortoise")}
                            >
                                Tortoise
                            </Checkbox>
                            <Checkbox
                                value={"Black"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Black")}
                                onChange={() => handleChangeFilter("Black")}
                            >
                                Black
                            </Checkbox>
                            <Checkbox
                                value={"Blue"}
                                color="#9D9D9D"
                                isChecked={filterValue.include("Blue")}
                                onChange={() => handleChangeFilter("Blue")}
                            >
                                Blue
                            </Checkbox>
                            <Checkbox
                                value={"Grey"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Greay")}
                                onChange={() => handleChangeFilter("Grey")}
                            >
                                Grey
                            </Checkbox>
                            <Checkbox
                                value={"Brown"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Brown")}
                                onChange={() => handleChangeFilter("Brown")}
                            >
                                Brown
                            </Checkbox>
                            <Checkbox
                                value={"Tranparent"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Transparent")}
                                onChange={() =>
                                    handleChangeFilter("Transparent")
                                }
                            >
                                Transparent
                            </Checkbox>
                            <Checkbox
                                value={"Gold"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Gold")}
                                onChange={() => handleChangeFilter("Gold")}
                            >
                                Gold
                            </Checkbox>
                            <Checkbox
                                value={"Green"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Green")}
                                onChange={() => handleChangeFilter("Green")}
                            >
                                Green
                            </Checkbox>
                            <Checkbox
                                value={"Silver"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Silver")}
                                onChange={() => handleChangeFilter("Silver")}
                            >
                                Silver
                            </Checkbox>
                            <Checkbox
                                value={"Pink"}
                                color="#9D9D9D"
                                isChecked={filterValue.push("Pink")}
                                onChange={() => handleChangeFilter("Pink")}
                            >
                                Pink
                            </Checkbox>
                        </VStack>
                    </Box>
                </Box> */}
                <Box h={1}></Box>
                <Box>
                    <Heading
                        as="h4"
                        size={"md"}
                        fontWeight={"medium"}
                        textAlign="left"
                    >
                        FRAME TYPE
                    </Heading>
                    <Box h={"2"}></Box>
                    <Grid
                        templateColumns={"repeat(3,1fr)"}
                        gap="4px"
                        _hover={{ cursor: "pointer" }}
                    >
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Full Rims
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Half Rims
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rimless.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Rimless
                            </Text>
                        </Box>
                    </Grid>
                </Box>
                <Box h={1}></Box>
                <Box>
                    <Heading
                        as="h4"
                        size={"md"}
                        fontWeight={"medium"}
                        textAlign="left"
                    >
                        FRAME SHAPE
                    </Heading>
                    <Box h={"2"}></Box>
                    <Grid templateColumns={"repeat(3,1fr)"} gap="4px">
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Rectangle
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Square.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Square
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Round.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Round
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/CatEye.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Cat Eye
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Aviator.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Aviator
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Geometric.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Geometric
                            </Text>
                        </Box>
                        <Box
                            border={"1px solid #E7E7E7"}
                            padding="4px"
                            _hover={{ borderColor: "black" }}
                        >
                            <Image
                                margin="auto"
                                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Wayfarer.png"
                            />
                            <Text fontSize={"2xs"} color="#9D9D9D">
                                Wayfarer
                            </Text>
                        </Box>
                    </Grid>
                </Box>
                <Box h={1}></Box>
                <Box w={208}>
                    <CollapseEx title={"Brand"} />
                    <CollapseEx title={"Frame Size"} />
                    <CollapseEx title={"Gender"} />
                </Box>
            </VStack>
        </Box>
    );
};

export default LeftFilterSection;
