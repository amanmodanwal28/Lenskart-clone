import React, { useContext, useState } from "react";
import {
    Box,
    VStack,
    Center,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Button,
    Checkbox,
    Text,
    useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    fname: "",
    lname: "",
    number: "",
    email: "",
};

const CreateAccount = () => {
    const { signup } = useContext(AuthContext);
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [formData, setFormData] = useState(initialState);
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        // setUser(userData);
        try {
            const res = await axios.post(
                "https://lenskart-backend-ia3u.onrender.com/users",
                formData
            );
            const newData = res.data;
            signup(newData);
        } catch (error) {
            console.log({ error: error.message });
        }
        setFormData(initialState);
        toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        navigate("/signup");
    };

    return (
        <>
            <Center marginTop={"40px"}>
                <Box
                    border={"1px solid grey"}
                    w={{ lg: "472px", md: "460px", sm: "400px", base: "400px" }}
                    borderRadius={"12px"}
                >
                    <form onSubmit={handleCreateAccount}>
                        <VStack spacing={4}>
                            <Box>
                                <Image
                                    borderRadius={"12px 12px 0 0"}
                                    src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
                                />
                            </Box>
                            <Box w={"80%"}>
                                <Input
                                    type="text"
                                    name="fname"
                                    value={formData.fname}
                                    placeholder="First Name*"
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box w={"80%"}>
                                <Input
                                    type="text"
                                    name="lname"
                                    value={formData.lname}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                            </Box>
                            <Box w={"80%"}>
                                <InputGroup>
                                    <InputLeftAddon children="+91" />
                                    <Input
                                        type="tel"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        placeholder="phone number"
                                    />
                                </InputGroup>
                            </Box>
                            <Box w={"80%"}>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </Box>
                            <Box w={"80%"}>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleClick}
                                        >
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>

                            <Box></Box>
                            <Box>
                                <Button
                                    textDecoration={"underline"}
                                    variant={"link"}
                                >
                                    Got a referal Code?
                                </Button>
                            </Box>
                            <Box textAlign={"left"} w={"80%"}>
                                <Checkbox>Get update on Whatsapp</Checkbox>
                            </Box>
                            <Box textAlign={"left"} w={"80%"}>
                                <Text fontSize={"xs"}>
                                    By creating this account, you agree to our
                                    Privacy Policy
                                </Text>
                            </Box>
                            <Box w={"80%"}>
                                <Button
                                    type="submit"
                                    colorScheme={"teal"}
                                    w={"100%"}
                                    borderRadius="25px"
                                >
                                    Create Account
                                </Button>
                            </Box>
                            <Box display={"flex"} gap={2}>
                                <Text>Already have an account. </Text>
                                <Button
                                    variant={"link"}
                                    color={"blue.300"}
                                    onClick={() => navigate("/signup")}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Box h={5}></Box>
                        </VStack>
                    </form>
                </Box>
            </Center>
        </>
    );
};

export default CreateAccount;
