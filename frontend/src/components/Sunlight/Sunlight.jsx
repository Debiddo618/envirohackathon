import { useEffect, useState } from "react";

const Sunlight = () => {
    const [sunInfo, setSunInfo] = useState(null);

    useEffect(() => {
        const url = "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results.sunrise);
                setSunInfo(data.results);
            });
    }, []);

    return (
        <>
            {sunInfo ? (
                <>
                    <p>Sunrise: {sunInfo.sunrise}</p>
                    <p>Sunset: {sunInfo.sunset}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Sunlight;
