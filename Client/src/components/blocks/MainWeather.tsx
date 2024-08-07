import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudSunRain, FaCloudSun, FaSun, FaDizzy, FaCloudShowersHeavy } from "react-icons/fa";
import { Flex, Button, Text, Icon, Box, Textarea, Select, Stat, StatLabel, StatNumber, StatArrow, StatHelpText, Heading } from "@chakra-ui/react";
import { getAdressAction, getWeaherAction, setAdressInfoAction } from "../../actions";


export const Icons = {
    'Clear Sky': {
        icon: FaSun,
        text: 'Ясно'
    },
    'Scattered clouds': {
        icon: FaCloudSun,
        text: 'Частично облачно'
    },
    'Few clouds': {
        icon: FaCloudSun,
        text: 'Частично облачно'
    },
    'Broken clouds': {
        icon: FaCloudSun,
        text: 'Частично облачно'
    },
    'Heavy rain': {
        icon: FaCloudShowersHeavy,
        text: 'Сильный дождь'
    },
    'Moderate rain': {
        icon: FaCloudShowersHeavy,
        text: 'Сильный дождь'
    },
    'Light rain': {
        icon: FaCloudSunRain,
        text: 'Дождь'
    }
}
const MainWeather = () => {
    const dispatch = useDispatch();
    const [activeService, setActiveService] = useState('average')

    const { coordinates, city, adress } = useSelector((state) => state.user.adressInfo)
    const { weatherInfo: { todayWeather: { otherWeather, weatherByHours }} } = useSelector((state) => state.user)
    // console.log(todayWeather, otherWeather)
    const currentHours = (new Date()).getHours()

    const veracity = activeService === 'Stormglass' ? {
        num: 60,
        div: 5,
        temp: '65% (+- 3C°)',
        os: '55%'
    } : {
        num: 90,
        div: 10,
        temp: '90% (+- 1C°)',
        os: '90%'
    }

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
                dispatch(getWeaherAction(activeService))
            })
        } catch (e) {
            dispatch(setAdressInfoAction(DEFAULT_ADRESS_INFO))
            dispatch(getWeaherAction(activeService))
        }
    }, [])

    const onSetAdress = (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            dispatch(getAdressAction(adress))
            dispatch(getWeaherAction(activeService))
        }
    };
    console.log(weatherByHours[currentHours]?.weatherType)

    return (
        <Flex py={5} justify="space-between" boxShadow='base' borderRadius='xl' wrap='wrap'>
            { true && <Box p={ 4 }>
                <Flex align="center">
                    <Icon as={Icons[otherWeather?.weatherType]?.icon} boxSize={[20, 40]} color="yellow.500" mr={4} />
                    <Flex align="center"  direction="column">
                        <Text fontSize={["50px", "80px", "100px"]}>{weatherByHours[currentHours]?.airTemperature > 0 ? `+${weatherByHours[currentHours]?.airTemperature}` : weatherByHours[currentHours]?.temperature}{'\u00A0'}C°</Text>
                        <Text fontSize="xl">Ощущается как {otherWeather?.feelsLike > 0 ? `+${otherWeather?.feelsLike}` : otherWeather?.feelsLike} C°</Text>
                    </Flex>
                </Flex>
                <Box pt={5}>
                    <Text>{Icons[otherWeather?.weatherType]?.text}</Text>
                    <Text>Скорость ветра: {otherWeather?.windSpeed} км/ч</Text>
                    <Text>Влажность: {otherWeather?.humidity}%</Text>
                    <Text>Давление: {otherWeather?.pressure} мм рт. ст.</Text>
                </Box>
            </Box>}
            {/* <Box maxW='400px' p={7}>
                <Icon as={FaDizzy} boxSize={[20, 20]} color="red.500" mr={4} />
                <Heading color='red.400'>Что-то пошло не так, попробуйте позже</Heading>
            </Box> */}
            <Box>
                <Flex justify='space-between' p={ 4 } minW='300px'>
                    {activeService !== 'average' && <Stat pt={ 5 }>
                        <StatLabel  fontSize='md'>Достоверность</StatLabel>
                        <StatNumber  fontSize='4xl'>{veracity.num}%</StatNumber>
                        <StatHelpText fontSize='md'>
                            <StatArrow type='increase' />
                            {veracity.div}%
                        </StatHelpText>
                    </Stat>}
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
                        {/* <Text color='red.400'>Не удалось найти адрес, используются данные по умолчанию</Text> */}
                        <Select maxW={300} value={activeService} onChange={(e) => {
                            setActiveService(e.target.value)
                            dispatch(getWeaherAction(e.target.value))
                            }} size="lg" textAlign="right" my={2} >
                            <option value="average">Среднее</option>
                            <option value="OpenWeather">OpenWeather</option>
                            <option value="AccuWeather">AccuWeather</option>
                            <option value="Stormglass">Stormglass</option>
                        </Select>
                    </Flex>
                </Flex>
                <Box p={ 4 }>
                    <Text textAlign={['start', 'end']}>Город: { city }</Text>
                    <Text textAlign={['start', 'end']}>Широта, долгота: { `${coordinates[1]}, ${coordinates[0]}`}</Text>
                    {activeService !== 'average' && <Text textAlign={['start', 'end']}>Точность температуры: {veracity.temp}</Text>}
                    {activeService !== 'average' && <Text textAlign={['start', 'end']}>Точность осадков: {veracity.os}</Text>}
                </Box>
            </Box>
        </Flex>
    );
};

export default memo(MainWeather);
