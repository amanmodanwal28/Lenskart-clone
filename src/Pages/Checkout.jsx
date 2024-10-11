import {
    Heading,
    Box,
    Text,
    FormControl,
    FormLabel,
    Input,
    Image,
    Flex,
    RadioGroup,
    HStack,
    Radio,
    VStack,
    InputGroup,
    InputLeftAddon,
    Divider,
    Select,
    Button,
    Stack,
    Center,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import logo from "../Assets/logo.png";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";

const initialState = {
    fname: "",
    lname: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    state: "",
};

const Checkout = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { cartItem, setCartItem, HandleQty } = useContext(CartContext);
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState(initialState);

    var subTotal = 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({ ...userDetail, [name]: value });
    };

    const handlePurchase = (e) => {
        e.preventDefault();
        if (
            userDetail.phoneNumber.split("").length === 10 &&
            userDetail.zip.split("").length === 6 &&
            userDetail.fname &&
            userDetail.lname &&
            userDetail.city &&
            userDetail.address
        ) {
            onOpen();
            setCartItem([]);
        } else {
            toast({
                title: `Please Enter a Valid Details.`,
                status: "error",
                isClosable: true,
            });
        }
    };

    const handleRemove = (id) => {
        const updatedCart = cartItem.filter((el) => el.id !== id);
        setCartItem(updatedCart);
    };

    const handleClose = () => {
        onClose();
        navigate("/");
    };

    return (
        <>
            <nav style={{ height: "80px", padding: "10px" }}>
                <div
                    style={{
                        margin: "0 150px",
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

            <Flex
                direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    base: "column",
                }}
                justifyContent={{
                    lg: "space-evenly",
                    md: "space-evenly",
                    sm: "center",
                    base: "center",
                }}
                marginTop={"20px"}
            >
                <Box
                    margin={{ lg: "0", md: "0", sm: "auto", base: "auto" }}
                    w={{ lg: "50%", md: "40%", sm: "80%", base: "80%" }}
                    border="1px solid #969696"
                    padding={10}
                    borderRadius="12px"
                >
                    <FormControl isRequired>
                        <Stack spacing={10}>
                            <Flex gap={4}>
                                <Input
                                    type="text"
                                    name="fname"
                                    placeholder="First name*"
                                    value={userDetail.fname}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="text"
                                    name="lname"
                                    placeholder="Last name*"
                                    value={userDetail.lname}
                                    onChange={handleChange}
                                />
                            </Flex>
                            <HStack>
                                <FormLabel as="legend">Gender</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    // value={userDetail.gender}
                                    // onChange={handleChange}
                                >
                                    <HStack spacing="24px">
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                            <HStack>
                                <InputGroup>
                                    <InputLeftAddon children="+91" />
                                    <Input
                                        type="tel"
                                        name="phoneNumber"
                                        value={userDetail.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                    />
                                </InputGroup>
                                <Input
                                    type="email"
                                    name="email"
                                    value={userDetail.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </HStack>

                            <Divider />

                            <HStack>
                                <Input
                                    type="text"
                                    name="address"
                                    value={userDetail.address}
                                    onChange={handleChange}
                                    placeholder="Address Line 1*"
                                />
                                <Input placeholder="Address Line 2" />
                            </HStack>
                            <HStack>
                                <Input
                                    type="text"
                                    name="zip"
                                    value={userDetail.zip}
                                    onChange={handleChange}
                                    placeholder="Zip / Postal Code*"
                                />
                                <Input
                                    type="text"
                                    name="city"
                                    value={userDetail.city}
                                    onChange={handleChange}
                                    placeholder="City / District*"
                                />
                            </HStack>
                            <HStack>
                                <Select
                                    name="country"
                                    value={userDetail.country}
                                    onChange={handleChange}
                                    variant="outline"
                                    placeholder="Select Country"
                                >
                                    <option value="india">INDIA</option>
                                    <option value="uae">UAE</option>
                                    <option value="england">ENGLAND</option>
                                    <option value="russia">RUSSIA</option>
                                </Select>
                                <Select
                                    name="state"
                                    variant="outline"
                                    value={userDetail.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                >
                                    <option value="maharashtra">
                                        MAHARASHTRA
                                    </option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                            </HStack>
                            <Box>
                                <Button
                                    onClick={handlePurchase}
                                    colorScheme="teal"
                                    type="submit"
                                    w={"300px"}
                                >
                                    Place Order
                                </Button>
                                <Modal
                                    onClose={onClose}
                                    isOpen={isOpen}
                                    isCentered
                                >
                                    <ModalOverlay />
                                    <ModalContent padding={7}>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Heading>
                                                Order SuccessFully Placed 🎉
                                            </Heading>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={handleClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Box>
                        </Stack>
                    </FormControl>
                </Box>
                <Box
                    margin={{ lg: "0", md: "0", sm: "auto", base: "auto" }}
                    w={{ lg: "30%", md: "30%", sm: "80%", base: "80%" }}
                    h={"fit-content"}
                    border="1px solid #969696"
                    borderRadius="12px"
                >
                    <HStack
                        justifyContent={"space-between"}
                        padding={"2px 8px"}
                    >
                        <Text>Shopping Cart</Text>
                        <Text>Item {cartItem.length}</Text>
                    </HStack>
                    <Divider />
                    <VStack>
                        {cartItem?.map((el) => {
                            subTotal += Number(el.price * el.qty);
                            return (
                                <>
                                    <Box
                                        key={el.id}
                                        display={"flex"}
                                        justifyContent={"space-evenly"}
                                        alignItems={"center"}
                                        w="100%"
                                    >
                                        <Box w={"120px"}>
                                            <Image src={el.image} w={"100%"} />
                                        </Box>
                                        <Box>
                                            {/* <Text>Qty</Text> */}
                                            <Button
                                                isDisabled={el.qty === 1}
                                                onClick={() =>
                                                    HandleQty(el, -1)
                                                }
                                                variant={"ghost"}
                                            >
                                                <MinusIcon />
                                            </Button>
                                            <Button variant={"outline"}>
                                                {el.qty}
                                            </Button>
                                            <Button
                                                onClick={() => HandleQty(el, 1)}
                                                variant={"ghost"}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() =>
                                                    handleRemove(el.id)
                                                }
                                                variant={"ghost"}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Divider />
                                </>
                            );
                        })}
                    </VStack>
                    <HStack
                        justifyContent={"space-between"}
                        padding={"2px 8px"}
                    >
                        <Text>SubTotal</Text>
                        <Text>Rs. {subTotal}</Text>
                    </HStack>
                    <HStack
                        justifyContent={"space-between"}
                        padding={"2px 8px"}
                    >
                        <Text>Net Amount</Text>
                        <Text>Rs. {subTotal}</Text>
                    </HStack>
                    <HStack
                        justifyContent={"space-between"}
                        padding={"2px 8px"}
                    >
                        <Text>Tax</Text>
                        <Text>Rs. 769</Text>
                    </HStack>
                    <Divider />
                    <HStack
                        justifyContent={"space-between"}
                        padding={"2px 8px"}
                    >
                        <Heading as="h3" fontSize={"lg"}>
                            ORDER TOTAL
                        </Heading>
                        <Heading as="h3" fontSize={"lg"}>
                            Rs.{subTotal + (cartItem.length === 0 ? 0 : 769)}
                        </Heading>
                    </HStack>
                </Box>
            </Flex>
        </>
    );
};

export default Checkout;
