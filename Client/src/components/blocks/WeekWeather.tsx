import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Button, Text, Card, CardHeader, Heading, CardBody, CardFooter, Box, Icon } from "@chakra-ui/react";
import { FaCloudSunRain, FaSun, FaCloudSun } from "react-icons/fa";
import { Icons } from "./MainWeather";

const today = (new Date()).getDay();
console.log(today)

const DAYS = [
 {day: "пн", temp: 20, icon: FaSun, temDiv: 3},
 {day: "вт", temp: 20, icon: FaCloudSunRain, temDiv: 3},
 {day: "ср", temp: 18, icon: FaCloudSun, temDiv: 4},
 {day: "чт", temp: 21, icon: FaSun, temDiv: 4},
 {day: "пт", temp: 16, icon: FaCloudSunRain, temDiv: 5},
 {day: "сб", temp: 15, icon: FaCloudSun, temDiv: 5},
 {day: "вс", temp: 20, icon: FaSun, temDiv: 3}
];
let days = [...DAYS.slice(today - 1), ...DAYS.slice(0, today - 1)];
const WeekWeaher = () => {
    const { weatherInfo: { weekWeather: { weatherByDays }} } = useSelector((state) => state.user)

    return (
        <Box  mt={ 4 } boxShadow='base' borderRadius='xl'>
            <Heading p={4}>На неделю</Heading>
            <Flex p={4} justify="space-between" overflowX='scroll'>
                {
                    weatherByDays.map(({airTemperature, weatherType}, index) => (
                        <Box key={ index } mr={ 4 }>
                            <Card size='sm'>
                                <CardHeader>
                                <Heading size='md'>{days[index].day}</Heading>
                                </CardHeader>
                                <CardBody>
                                <Icon as={Icons[weatherType]?.icon} boxSize={20} color="yellow.500" mr={4} />
                                <Text fontSize='xl'>+{airTemperature}{'\u00A0'}C°</Text>
                                <Text fontSize='sm'>+-{days[index]?.temDiv}{'\u00A0'}C°</Text>
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
