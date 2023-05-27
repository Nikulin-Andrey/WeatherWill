import React, { memo, useEffect, useState } from "react";
import { Flex, Button, Text, Card, CardHeader, Heading, CardBody, CardFooter, Box, Icon } from "@chakra-ui/react";
import { FaCloudSunRain } from "react-icons/fa";

const HOURS = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];

const TodayWeaher = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, [])

    return (
        <Box  mt={ 4 } boxShadow='base' borderRadius='xl'>
            <Heading p={4}>{ now.toLocaleString('ru-RU')}</Heading>
            <Flex p={4} justify="space-between" overflowX='scroll'>
                {
                    HOURS.map(hour => (
                        <Box key={ hour } mr={ 4 }>
                            <Card size='sm'>
                                <CardHeader>
                                <Heading size='md'>{hour}</Heading>
                                </CardHeader>
                                <CardBody>
                                <Icon as={FaCloudSunRain} boxSize={20} color="yellow.500" mr={4} />
                                <Text fontSize='xl'>+18{'\u00A0'}C°</Text>
                                </CardBody>

                            </Card>
                        </Box>
                    ))
                }
            </Flex>
        </Box>
    );
};

export default memo(TodayWeaher);
