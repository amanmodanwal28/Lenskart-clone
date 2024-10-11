// import { ReactNode } from 'react';
import {
    Text,
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    Stack,
    Image,
    Input,
    Heading,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../Assets/logo.png";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isAuth, logout, login, currentLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const Links = [
        { to: "/products", title: "EYEGLASSES" },
        { to: "/products", title: "KIDS GLASSES" },
        { to: "/products", title: "CONTACT LENSES" },
        { to: "/products", title: "SUNGLASSES" },
        { to: "/products", title: "STORE LOCATION" },
    ];

    const handleCartClick = () => {
        navigate(`/addtocart`);
    };

    // const handleSignIn = () => {
    //   setIsAuth(!isAuth)
    // }

    return (
        <Box
            bgColor={"white"}
            w={"100%"}
            position={"sticky"}
            top={0}
            zIndex={"banner"}
        >
            <Box px={4}>
                <Flex
                    h={"80px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack
                        spacing={120}
                        width={"100%"}
                        justifyContent={"space-evenly"}
                    >
                        <Box>
                            <HStack
                                onClick={() => navigate("/")}
                                _hover={{ cursor: "pointer" }}
                            >
                                <Image
                                    src={logo}
                                    w={{
                                        lg: "md",
                                        md: "md",
                                        sm: "md",
                                        base: "md",
                                    }}
                                />
                            </HStack>
                        </Box>
                        <Box
                            w={"80%"}
                            display={{
                                base: "none",
                                sm: "none",
                                md: "none",
                                lg: "block",
                            }}
                        >
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="gray.300" />}
                                />
                                <Input
                                    type="tel"
                                    placeholder="What are you looking for"
                                    variant="outline"
                                />
                            </InputGroup>
                        </Box>

                        <Box
                            w={{
                                lg: "520px",
                                md: "100%",
                                sm: "100%",
                                base: "100%",
                            }}
                            justifyContent={"space-evenly"}
                        >
                            <Flex justifyContent={"space-evenly"}>
                                <Box>
                                    <Text _hover={{ cursor: "pointer" }}>
                                        Track Order
                                    </Text>
                                </Box>
                                <Box _hover={{ cursor: "pointer" }}>
                                    {!isAuth ? (
                                        <Text
                                            onClick={() => navigate("/signup")}
                                            _hover={{ cursor: "pointer" }}
                                        >
                                            Sign up
                                        </Text>
                                    ) : (
                                        <Menu isLazy>
                                            <MenuButton>
                                                {currentLogin}
                                            </MenuButton>
                                            <MenuList>
                                                {/* MenuItems are not rendered unless Menu is open */}
                                                <MenuItem>My Account</MenuItem>
                                                <MenuItem>Orders</MenuItem>
                                                <MenuItem
                                                    onClick={() => logout()}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    )}
                                </Box>
                                <Text
                                    _hover={{ cursor: "pointer" }}
                                    onClick={handleCartClick}
                                >
                                    Cart
                                </Text>
                            </Flex>
                        </Box>
                    </HStack>
                </Flex>
            </Box>

            <Box bg={"#FCF9F7"} p={4} w={"100%"}>
                <HStack
                    as={"nav"}
                    spacing={8}
                    display={{ base: "none", md: "flex" }}
                    h={10}
                >
                    {Links.map((link) => (
                        <RouterLink key={link.to} to={link.to}>
                            {link.title}
                        </RouterLink>
                    ))}
                </HStack>
            </Box>

            {/* <Box p={4}>Main Content Here</Box> */}
        </Box>
    );
}
