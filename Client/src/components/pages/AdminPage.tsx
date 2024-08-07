import React, { memo, useState } from "react";
import { Box, Flex, Stat, StatLabel, StatNumber,  Select, StatArrow, StatHelpText, Text, Input, Button, Heading} from "@chakra-ui/react";

type item = {
    adress: string;
    dateAndTime: string;
    temperature: string;
    sky: string;
}

const AdminPage = () => {

    const [items, setItems] = useState<item[]>([
        {
            adress: "Минск",
            dateAndTime: "2023-06-04T13:03",
            temperature: "18",
            sky: "Ясно",
        },
        {
            adress: "Минск",
            dateAndTime: "2023-06-03T12:10",
            temperature: "14",
            sky: "Частично облачно",
        }
    ]);
    const [newItem, setNewItems] = useState<item>({
        adress: "",
        dateAndTime: "",
        temperature: "",
        sky: "",
    });

    const onAdd = () => {
        setItems((prevItems) => ([newItem, ...prevItems]));
        console.log(items)
    }

    return (
        <>
            <Box maxWidth='container.md' mx="auto" p={ 4 } boxShadow='base' borderRadius='xl' my={ 4 }>
                <Input value={ newItem.adress } onChange={ (e) => setNewItems((item) => ({ ...item, adress: e.target.value}))} mb={ 2 } placeholder='Введите адрес'/>
                <Input value={ newItem.dateAndTime } onChange={ (e) => setNewItems((item) => ({ ...item, dateAndTime: e.target.value}))} mb={ 2 } placeholder='Введите дату и время' type='datetime-local' />
                <Input value={ newItem.temperature } onChange={ (e) => setNewItems((item) => ({ ...item, temperature: e.target.value}))} mb={ 2 } placeholder='Введите температуру'/>
                <Select value={ newItem.sky } onChange={ (e) => setNewItems((item) => ({ ...item, sky: e.target.value}))} mb={ 2 } defaultValue='clear'>
                    <option value="rain">Дождь</option>
                    <option value="clouds">Облачно</option>
                    <option value="havy-rain">Сильный дождь</option>
                    <option value="clear">Ясно</option>
                    <option value="snow">Снег</option>
                    <option value="fog">Туман</option>
                </Select>
                <Button onClick={ onAdd }>Отправить</Button>
            </Box>
            <Box maxWidth='container.md' mx="auto" p={ 4 } boxShadow='base' borderRadius='xl'>
                <Heading>История</Heading>
                {
                    items.map(({ adress, temperature, sky, dateAndTime}) => (
                        <Flex p={ 2 } boxShadow='base' borderRadius='xl' my={ 4 }>
                            <Box mr={ 10 }>
                                <Heading size='md'>Введенные данные {dateAndTime}</Heading>
                                <Text>Адресс: {adress}</Text>
                                <Text>Температура: {temperature}</Text>
                                <Text>{sky}</Text>
                            </Box>
                            <Box >
                                <Box p={ 2 } boxShadow='base' borderRadius='xl'>
                                    <Heading size='md'>OpenWeather</Heading>
                                    <Text>Достоверность: 60%</Text>
                                    <Text>Адресс: {adress}</Text>
                                    <Text>Температура: {Number(temperature) + 3}</Text>
                                    <Text></Text>
                                </Box>
                                <Box p={ 2 } boxShadow='base' borderRadius='xl'>
                                    <Heading size='md'>AccuWeather</Heading>
                                    <Text>Достоверность: 60%</Text>
                                    <Text>Адресс: {adress}</Text>
                                    <Text>Температура: {Number(temperature) - 3}</Text>
                                    <Text>{sky}</Text>
                                </Box>
                                <Box p={ 2 } boxShadow='base' borderRadius='xl'>
                                    <Heading size='md'>Stormglass</Heading>
                                    <Text>Достоверность: 90%</Text>
                                    <Text>Адресс: {adress}</Text>
                                    <Text>Температура: {Number(temperature) + 1}</Text>
                                    <Text>{sky}</Text>
                                </Box>
                            </Box>
                        </Flex>
                    ))
                }
            </Box>
        </>
    );
};

export default memo(AdminPage);
