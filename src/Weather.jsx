import "./Weather.css";
import { useState } from "react";
const api = {
    key: "77ba0bfa6df7eae3eaaa4dbb052ce3c2",
    base: "https://api.openweathermap.org/data/2.5/",
};
export function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery("");
                    console.log(weather);
                });
        }
    };
    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    };
    return (
        <div
            className={
                typeof weather.main != "undefined"
                    ? weather.main.temp > 16
                        ? "app-warm"
                        : "app"
                    : "app"
            }
        >
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={query}
                        onKeyPress={search}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                <div className="footer">
                    {typeof weather.main != "undefined" ? (
                        <div className="location-box">
                            <div className="location">
                                {weather.name},{weather.sys.country}
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°c
                                </div>
                                <div className="weather">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    ) : (
                        " "
                    )}
                    <p>Created by Yorgi Alejandro</p>
                </div>
            </main>
        </div>
    );
}
