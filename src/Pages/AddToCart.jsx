import {
    Box,
    Heading,
    HStack,
    Button,
    Flex,
    Center,
    Image,
    Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import CartCard from "../Components/CartCard";
import { CartContext } from "../Context/CartContext";
import logo from "../Assets/logo.png";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AddToCart = () => {
    const { cartItem, setCartItem } = useContext(CartContext);
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    var totalCartPrice = 0;

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('items'));
    //     if (items) {
    //         setItems(items);
    //     }
    // }, []);
    // console.log(items)
    const handleCheckout = () => {
        if (isAuth === true && cartItem.length > 0) {
            navigate("/checkout");
        } else if (isAuth === true && cartItem.length === 0) {
            navigate("/products");
        } else {
            navigate("/signup");
        }
    };

    return (
        <>
            {/* Custom NavBar */}

            <nav style={{ height: "80px", padding: "10px" }}>
                <div
                    style={{
                        margin: "0 150px",
                        display: "flex",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        _hover={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                        style={{ height: "59px", width: "230px" }}
                    >
                        <img src={logo} alt="" />
                    </Box>

                    <div style={{ display: "flex", height: "25px" }}>
                        <Box>
                            <img
                                src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/Shield.svg"
                                alt=""
                            />
                        </Box>
                        <Box w={2}></Box>
                        <Box>
                            <Text fontSize={"md"} fontWeight={"normal"}>
                                100% safe and secure
                            </Text>
                        </Box>
                    </div>
                </div>
            </nav>

            <Box h={6} bgColor={"#FCF9F7"}></Box>

            <Box bgColor={"#FCF9F7"} h={"800px"}>
                <Center>
                    <Box w={"1276px"} padding={"10px"}>
                        <Flex justifyContent={"space-evenly"}>
                            <Box w={"725px"}>
                                <Box p={"2px 10px"}>
                                    <Heading
                                        textAlign={"left"}
                                        as="h2"
                                        fontSize={"2xl"}
                                        fontWeight={"normal"}
                                    >
                                        Cart ({cartItem.length} items)
                                    </Heading>
                                </Box>
                                {cartItem?.map((el) => {
                                    totalCartPrice += Number(el.price);
                                    return <CartCard data={el} />;
                                })}
                            </Box>

                            <Box w={"360px"} h={"580px"}>
                                <Box p={"2px 10px"}>
                                    <Heading
                                        textAlign={"left"}
                                        as="h2"
                                        fontSize={"2xl"}
                                        fontWeight={"normal"}
                                    >
                                        Bill Details
                                    </Heading>
                                </Box>

                                <Box
                                    borderRadius={"12px"}
                                    border={"1px solid lightgrey"}
                                    box-shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                    padding={"16px"}
                                    margin={"10px"}
                                    marginBottom={"20px"}
                                    bgColor={"white"}
                                >
                                    <HStack
                                        justifyContent={"space-between"}
                                        marginBottom={"10px"}
                                    >
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"medium"}
                                                fontWeight={"light"}
                                            >
                                                Total Price
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"medium"}
                                                fontWeight={"light"}
                                            >
                                                Rs.{totalCartPrice}
                                            </Heading>
                                        </Box>
                                    </HStack>
                                    <HStack
                                        justifyContent={"space-between"}
                                        margin={"10px 0"}
                                    >
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"medium"}
                                                fontWeight={"light"}
                                            >
                                                Standard Delivery
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"medium"}
                                                fontWeight={"light"}
                                            >
                                                Rs.250
                                            </Heading>
                                        </Box>
                                    </HStack>
                                    <HStack
                                        justifyContent={"space-between"}
                                        marginTop={"10px"}
                                    >
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"lg"}
                                                fontWeight={"bold"}
                                            >
                                                Total Payable
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Heading
                                                as="h3"
                                                fontSize={"lg"}
                                                fontWeight={"bold"}
                                            >
                                                Rs.{totalCartPrice + 250}
                                            </Heading>
                                        </Box>
                                    </HStack>
                                </Box>

                                <Button
                                    onClick={handleCheckout}
                                    w={"95%"}
                                    h={"50px"}
                                    borderRadius={"25px"}
                                    colorScheme="teal"
                                >
                                    Proceed To Checkout
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Center>
            </Box>
        </>
    );
};

export default AddToCart;
