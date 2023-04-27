import axios from "axios";
import React, { useEffect, useState } from "react";
import "./weatherApp.css";

const WeatherApp = () => {
	const [data, setData] = useState(null);
	const [search, setSearch] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f8b318e167f32e61803c68636e1bb149`;
			const result = await axios.get(url);
			setData(result.data);
		};

		fetchData();
	}, [search]);

	const InputEvent = (event) => {
		setSearch(event.target.value);
	};

	return (
		<>
			<div
				className="container flex"
				style={{
					backgroundImage: "linear-gradient(-45deg, #006eff, #8e2bff, #ff34c9)",
				}}
			>
				<div className="weather-app">
					<div className="input-box">
						<span className="icon">
							<i className="fa-solid fa-magnifying-glass"></i>
						</span>
						<input
							type="search"
							placeholder="Search Here..."
							onChange={InputEvent}
							value={search}
						/>
					</div>

					{!data ? (
						<p className="data_not_found">
							Data Not Found!!! <br /> 🤔
						</p>
					) : (
						<>
							<div className="content">
								<div className="location flex">
									<p>location:</p>
									<h1>
										<i className="fa-solid fa-street-view"></i>
										{search}
									</h1>
								</div>

								<div className="temprature flex">
									<h1>{data.main.temp}°Cel</h1>
									<h3>
										Min - {data.main.temp_min}°Cel | Max - {data.main.temp_max}°Cel
									</h3>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default WeatherApp;
