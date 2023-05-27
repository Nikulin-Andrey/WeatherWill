import React, { memo, useEffect, useState } from "react";
import { Flex, Button, Text, Card, CardHeader, Heading, CardBody, CardFooter, Box, Icon } from "@chakra-ui/react";
import { FaCloudSunRain } from "react-icons/fa";

const today = (new Date()).getDay();
console.log(today)

const DAYS = ['пн', "вт", "ср", "чт", "пт", "сб", "вс"];
let days = [...DAYS.slice(today - 1), ...DAYS.slice(0, today - 1)];
const WeekWeaher = () => {

    return (
        <Box  mt={ 4 } boxShadow='base' borderRadius='xl'>
            <Heading p={4}>На неделю</Heading>
            <Flex p={4} justify="space-between" overflowX='scroll'>
                {
                    days.map(day => (
                        <Box key={ day } mr={ 4 }>
                            <Card size='sm'>
                                <CardHeader>
                                <Heading size='md'>{day}</Heading>
                                </CardHeader>
                                <CardBody>
                                <Icon as={FaCloudSunRain} boxSize={20} color="yellow.500" mr={4} />
                                <Text fontSize='xl'>+18{'\u00A0'}C°</Text>
                                <Text fontSize='sm'>+-3{'\u00A0'}C°</Text>
                                </CardBody>

                            </Card>
                        </Box>
                    ))
                }
            </Flex>
        </Box>
    );
};

export default memo(WeekWeaher);
