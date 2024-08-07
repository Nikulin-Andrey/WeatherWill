import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Button, Text, Card, CardHeader, Heading, CardBody, CardFooter, Box, Icon } from "@chakra-ui/react";
import { FaCloudSunRain, FaCloudSun, FaSun } from "react-icons/fa";
import { Icons } from "./MainWeather";

const HOURS = [
    {time: "00:00", temp: 8, icon: FaSun},
    {time: "01:00", temp: 8, icon: FaSun},
    {time: "02:00", temp: 7, icon: FaSun},
    {time: "03:00", temp: 6, icon: FaSun},
    {time: "04:00", temp: 5, icon: FaSun},
    {time: "05:00", temp: 4, icon: FaSun},
    {time: "06:00", temp: 7, icon: FaSun},
    {time: "07:00", temp: 7, icon: FaSun},
    {time: "08:00", temp: 10, icon: FaSun},
    {time: "09:00", temp: 11, icon: FaSun},
    {time: "10:00", temp: 13, icon: FaSun},
    {time: "11:00", temp: 14, icon: FaSun},
    {time: "12:00", temp: 18, icon: FaSun},
    {time: "13:00", temp: 21, icon: FaSun},
    {time: "14:00", temp: 20, icon: FaSun},
    {time: "15:00", temp: 20, icon: FaSun},
    {time: "16:00", temp: 19, icon: FaSun},
    {time: "17:00", temp: 18, icon: FaSun},
    {time: "18:00", temp: 18, icon: FaSun},
    {time: "19:00", temp: 16, icon: FaSun},
    {time: "20:00", temp: 15, icon: FaSun},
    {time: "21:00", temp: 12, icon: FaSun},
    {time: "22:00", temp: 12, icon: FaSun},
    {time: "23:00", temp: 9, icon: FaCloudSun},
    {time: "24:00", temp: 8, icon: FaCloudSun},
];

const TodayWeaher = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    const { weatherInfo: { todayWeather: { weatherByHours }} } = useSelector((state) => state.user)

    return (
        <Box mt={4} boxShadow="base" borderRadius="xl">
            <Heading p={4}>{ now.toLocaleString('ru-RU') }</Heading>
            <Flex p={4} justify="space-between" overflowX="scroll">
                {weatherByHours.map(({airTemperature, weatherType}, index) => (
                    <Box key={index} mr={4}>
                        <Card size="sm">
                            <CardHeader>
                                <Heading size="md">{index < 10 ? `0${index}:00` : `${index}:00`}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Icon as={Icons[weatherType]?.icon} boxSize={20} color="yellow.500" mr={4} />
                                <Text fontSize="xl">{airTemperature > 0 ? `+${airTemperature}` : airTemperature}{"\u00A0"}C°</Text>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default memo(TodayWeaher);
