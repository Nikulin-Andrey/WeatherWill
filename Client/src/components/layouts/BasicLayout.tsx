import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Flex, Heading, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

type BasicLayoutProprs = {
    children: ReactElement;
};

const BasicLayout: FC<BasicLayoutProprs> = ({ children }) => {
    const { toggleColorMode } = useColorMode();

    const handleLogInClick = () => {

    }

    return (
        <>
            <Box as="header" bg={useColorModeValue("gray.300", "gray.700")}>
                <Container maxW="container.xl">
                    <Flex justify="space-between" py="3">
                        <Heading color={useColorModeValue("gray.600", "gray.200")} fontSize={['md', '3xl']} as={ Link } to="/">WeatherWill</Heading>
                        <Button onClick={toggleColorMode}>Поменять тему</Button>
                        <Button onClick={ handleLogInClick } as={ Link } to="/login">Войти</Button>
                    </Flex>
                </Container>
            </Box>
            <Container color={useColorModeValue("gray.600", "gray.200")} maxW="container.xl" py="2">
                {children}
            </Container>
        </>
    );
};

export default BasicLayout;
