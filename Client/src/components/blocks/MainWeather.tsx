import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudSunRain } from "react-icons/fa";
import { Flex, Button, Text, Icon, Box, Textarea, Select, Stat, StatLabel, StatNumber, StatArrow, StatHelpText } from "@chakra-ui/react";
import { getAdressAction, setAdressInfoAction } from "../../actions";

const MainWeather = () => {
    const dispatch = useDispatch();

    const { coordinates, city, adress } = useSelector((state) => state.user.adressInfo)

    useEffect(() => {
        try {
            dispatch(getAdressAction('DEFAULT_ADRESS_INFO'))

            navigator.geolocation.getCurrentPosition(async pos => {

                const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&addressdetails=1&accept-language=ru`)
                const info = await resp.json()

                const {
                    properties: { address: { city, road } }
                } = info.features[0]

                dispatch(setAdressInfoAction({
                    coordinates: [pos.coords.longitude, pos.coords.latitude],
                    city,
                    adress: `${city}, ${road}`
                }))
                console.log(info)

            })
        } catch (e) {
            dispatch(setAdressInfoAction(DEFAULT_ADRESS_INFO))
        }
    }, [])

    const onSetAdress = (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            dispatch(getAdressAction(adress))
        }
    };

    return (
        <Flex py={5} justify="space-between" boxShadow='base' borderRadius='xl' wrap='wrap'>
            <Box p={ 4 }>
                <Flex align="center">
                    <Icon as={FaCloudSunRain} boxSize={[20, 40]} color="yellow.500" mr={4} />
                    <Flex align="center"  direction="column">
                        <Text fontSize={["50px", "80px", "100px"]}>+18{'\u00A0'}C°</Text>
                        <Text fontSize="xl">Ощущается как +15 C°</Text>
                    </Flex>
                </Flex>
                <Box pt={5}>
                    <Text>Дождь</Text>
                    <Text>Скорость ветра: 17 км/ч</Text>
                    <Text>Влажность: 70%</Text>
                    <Text>Давление: 741 мм рт. ст.</Text>
                </Box>
            </Box>
            <Box>
                <Flex justify='space-between' p={ 4 } minW='300px'>
                    <Stat pt={ 5 }>
                        <StatLabel  fontSize='md'>Достоверность</StatLabel>
                        <StatNumber  fontSize='4xl'>70%</StatNumber>
                        <StatHelpText fontSize='md'>
                            <StatArrow type='increase' />
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Flex direction='column' align='end'>
                        <Textarea
                            variant="unstyled"
                            placeholder="Введите адрес"
                            textAlign="end"
                            fontSize="40px"
                            h={10}
                            maxW={400}
                            value={ adress }
                            onChange={ (e) => {dispatch(setAdressInfoAction({adress: e.target.value, city, coordinates}))} }
                            onKeyDown={ onSetAdress }
                        />
                        <Select maxW={300} defaultValue="option1" size="lg" textAlign="right" my={2}>
                            <option value="average">Среднее</option>
                            <option value="OpenWeather">OpenWeather</option>
                            <option value="AccuWeather">AccuWeather</option>
                            <option value="DarkSky">DarkSky</option>
                        </Select>
                    </Flex>
                </Flex>
                <Box p={ 4 }>
                    <Text textAlign={['start', 'end']}>Город: { city }</Text>
                    <Text textAlign={['start', 'end']}>Координаты: { coordinates?.join(', ')}</Text>
                    <Text textAlign={['start', 'end']}>Точность температуры: 80% (+- 3C°)</Text>
                    <Text textAlign={['start', 'end']}>Точность осадков: 60%</Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default memo(MainWeather);
