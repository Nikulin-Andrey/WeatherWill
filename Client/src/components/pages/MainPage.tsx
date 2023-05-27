import React, { memo } from "react";
import MainWeather from "../blocks/MainWeather";
import TodayWeather from "../blocks/TodayWeather";
import WeekWeather from "../blocks/WeekWeather";

const MainPage = () => {
    return (
        <>
            <MainWeather />
            <TodayWeather />
            <WeekWeather />
        </>
    );
};

export default memo(MainPage);
