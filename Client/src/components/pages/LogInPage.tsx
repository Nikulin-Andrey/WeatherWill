import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useDisclosure,
    InputGroup,
    InputRightElement,
    IconButton,
    Tooltip,
    FormErrorMessage
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { logInAction } from "../../actions";


const LogInPage = () => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const onClickReveal = () => {
        onToggle();
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    };

    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const { token, message } = useSelector(store => store.user)

    useEffect(() => {
      if (token) {
        navigate('/admin')
      }
      if (message) {
        alert(message)
      }
    }, [token, message])

    const onLogIn = () => {
      dispatch(logInAction({ email, password }))
    }

    return (
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
            <Stack spacing="8">
                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                    <Tooltip label='В данный момент авторизация доступна только администраторам. Напишите запрос на почту andrey_nikulin3@mail.ru, если хотите получить права администратора'>
                        <Heading>Вход</Heading>
                    </Tooltip>
                </Stack>
                <Box
                    py={{ base: "0", sm: "8" }}
                    px={{ base: "4", sm: "10" }}
                    bg={{ base: "transparent", sm: "bg-surface" }}
                    boxShadow={{ base: "none", sm: "md" }}
                    borderRadius={{ base: "none", sm: "xl" }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl >
                                <FormLabel htmlFor="email">Электронная почта</FormLabel>
                                <Input id="email" type="email" value={ email } onChange={ (e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl >
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={isOpen ? "Mask password" : "Reveal password"}
                                            icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                            onClick={onClickReveal}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="password"
                                        ref={inputRef}
                                        name="password"
                                        type={isOpen ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={ password }
                                        onChange={ (e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                                {/* <FormErrorMessage>Невернай логин или пароль</FormErrorMessage> */}
                            </FormControl>
                        </Stack>
                        <Stack spacing="6">
                            <Button onClick={ onLogIn }>Войти</Button>
                            <HStack>
                                <Divider />
                                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                </Text>
                                <Divider />
                            </HStack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default LogInPage
