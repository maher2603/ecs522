// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';      

export default class Iphone extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// set the temperature, button display, data grabbed and current page states
		this.state = {
			temp : "",
			display : true,
			data_grabbed : false,
			on_home_page: true,
			on_location_page: false,
			on_weekly_weather_page: false
		}
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
		} else {
			console.log("Geolocation is not supported.");
		}
	}

	showPosition = (position) => {
		if (this.state.on_home_page) {
			const { latitude, longitude } = position.coords;
			const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=5065eab2c0c7e99992ba98ce43ab3e2c`;
			this.fetchWeatherData(url);
		}
		const url = "http://api.openweathermap.org/data/2.5/group?id=2643743,2655603,2643123,2653941,2644668,2654675,2640729&units=metric&appid=5065eab2c0c7e99992ba98ce43ab3e2c";
		this.fetchWeatherData(url);
	}
	
	showError = (error) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=5065eab2c0c7e99992ba98ce43ab3e2c`;
		this.fetchWeatherData(url);
	}

	fetchWeatherData = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.parseResponse(data);
				this.setState({ display: false, data_grabbed: true });
			})
			.catch(error => console.log(`API call failed: ${error}`));
	}

	// URL: http://api.openweathermap.org/data/2.5/group?id=2643743,2655603,2643123,2653941,2644668,2654675,2640729&units=metric&appid=5065eab2c0c7e99992ba98ce43ab3e2c
	// City IDs:
	// London - 2643743
	// Birmingahm - 2655603
	// Manchester - 2643123
	// Cambridge - 2653941
	// Leicester - 2644668
	// Bristol - 2654675
	// Oxford - 2640729

	// decide what image to show depending on the main weather
  mainWeatherImage = (main_weather) => {
    if (main_weather == "Clear") {
      return <img id="clear-icon" src="./assets/icons/sunny_bg.svg" alt="Clear Icon"></img>
    } else if (main_weather == "Clouds") {
      return <img id="cloudy-icon" src="./assets/icons/partial_cloud_bg.svg" alt="Cloudy Icon"></img>
    } else if (main_weather == "Rain") {
      return <img id="rainy-icon" src="./assets/icons/rainy_background.svg" alt="Rainy Icon"></img>
    } else if (main_weather == "Thunderstorm") {
      return <img id="thunderstorm-icon" src="./assets/icons/thunderstorm_bg.svg" alt="Thunderstorm Icon"></img>
    } else if (main_weather == "Drizzle") {
      return <img id="drizzle-icon" src="./assets/icons/drizzle_bg.svg" alt="Drizzle Icon"></img>
    } else if (main_weather == "Snow") {
      return <img id="snow-icon" src="./assets/icons/snow_bg.svg" alt="Snow Icon"></img>
    } else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
      return <img id="atmosphere-icon" src="./assets/icons/misty_bg.svg" alt="Atmosphere Icon"></img>
    }
  }

	miniWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
			return <img id="clear-icon" src="./assets/icons/sunny_svg.svg" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
			return <img id="cloudy-icon" src="./assets/icons/rainy_svg.svg" alt="Cloudy Icon"></img>
		} else if (main_weather == "Rain") {
			return <img id="rainy-icon" src="./assets/icons/rainy_svg.svg" alt="Rainy Icon"></img>
		} else if (main_weather == "Thunderstorm") {
			return <img id="thunderstorm-icon" src="./assets/icons/thunderstorm_svg.svg" alt="Thunderstorm Icon"></img>
		} else if (main_weather == "Drizzle") {
			return <img id="drizzle-icon" src="./assets/icons/drizzle_svg.svg" alt="Drizzle Icon"></img>
		} else if (main_weather == "Snow") {
			return <img id="snow-icon" src="./assets/icons/snow_svg.svg" alt="Snow Icon"></img>
		} else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
			return <img id="atmosphere-icon" src="./assets/icons/foggy_svg.svg" alt="Atmosphere Icon"></img>
		}
	}

	// the main render method for the iphone component
	render() {
		if (this.state.on_home_page == true) {
			// check if temperature data is fetched, if so add the sign styling to the page
			const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
			const contaStyles = this.state.main ? `${style.conta}` : style.conta2;
			const conta3Styles = this.state.main ? `${style.conta3}` : style.conta2;
			// display all weather data
			return (
				<div class={ style.container }>
					<div class={ style.header }>
						<div class={ style.navigation } style="text-align: centre;">
							<div> { this.state.data_grabbed ? <button class={style.button}>Home</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_home_page: false, on_location_page: true })}>Location</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_home_page: false, on_weekly_weather_page: true })}>Week</button> : null } </div>
						</div>
						<div class={contaStyles}>
							<div class={ style.city }>
								{ this.state.locate }
							</div>
							<div class={conta3Styles}>
								<div class={style.weather_img}>
									{ this.state.data_grabbed ? this.mainWeatherImage(this.state.main): null }
								</div>		
								<div class={ style.conditions } >
									{ this.state.main }
								</div>
								<span class={ tempStyles }>
									{ this.state.temp }
								</span>
							</div>
							<div>
								{this.state.data_grabbed ? <h3>Precipitation</h3> : null}
							</div>
							<div class={ style.precipitation }>
								{ this.state.data_grabbed ? <img id="rainy-icon" style="padding:0px;padding-right: 160px;" src="./assets/icons/pop_svg.svg" alt="Raining Icon"></img> : null }
								{ this.state.prec }
							</div>
							<div id="windspeed">
								{this.state.data_grabbed ? <h3>Wind Speed</h3> : null}
							</div>
							<div class={ style.windspeed }>
								{ this.state.data_grabbed ? <img id="windspeed-icon"  src="./assets/icons/windspeed_svg.svg" alt="Wind Speed Icon"style="padding:0; margin:0;padding-right: 100px;"></img> : null }
								{ this.state.wspeed }
							</div>
						</div>
						<h3 class={style.forecast} style="margin-left:70px; bottom-padding:"></h3>
							<div class={ style.forecast_text }>
								<p class={ style.forecast_text }>6h</p>
								<p class={ style.forecast_text }>12h</p>
								<p class={ style.forecast_text }>24h</p>
							</div>
						<div class={ style.forecast }>	
							<div class={ style.forecast_image }>
								{ this.state.data_grabbed ? this.miniWeatherImage(this.state.main_6h): null }
								<p class={ style.forecast_textLabel }>{this.state.main_6h} </p>
							</div>
							<div class={style.vl}></div>
							<div class={ style.forecast_image }>
								{ this.state.data_grabbed ? this.miniWeatherImage(this.state.main_12h): null }
								<p class={ style.forecast_textLabel }>{this.state.main_12h}</p>
							</div>
							<div class={style.vl}></div>
							<div class={ style.forecast_image }>
								{ this.state.data_grabbed ? this.miniWeatherImage(this.state.main_24h): null }
								<p class={ style.forecast_textLabel }>{this.state.main_24h}</p>
							</div>
						</div>
					</div>
					<div class={ style.details }></div>
					<div class= { style_iphone.container }> 
						{ this.state.display ? this.fetchWeatherData() : null }
					</div>
				</div>
			);
		} else if (this.state.on_location_page == true) {
			return (
				<div class={ style.container }>
					<div class={ style.header }>
						<div class={ style.navigation } style="text-align: centre;">
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_location_page: false, on_home_page: true })}>Home</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button}>Location</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_location_page: false, on_weekly_weather_page: true })}>Week</button> : null } </div>
						</div>
						{this.fetchWeatherData()}
						<div class = { style.locations_page }>
							<div id = { style.location1 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location2 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location3 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location4 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location5 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location6 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
							<div  id = { style.location7 }>
								<select id="location">
									<option value="">--Select--</option>
									<option value="London">London</option>
									<option value="Birmingham">Birmingham</option>
									<option value="Manchester">Manchester</option>
									<option value="Cambridge">Cambridge</option>
									<option value="Leicester">Leicester</option>
									<option value="Bristol">Bristol</option>
									<option value="Oxford">Oxford</option>
								</select>
							</div>
						</div>
						<div class = { style.locations_content }>
							<div id = { style.London }>
								<div>London, GB</div>
								<div>{this.miniWeatherImage(this.state.main_lon)}</div>
								<div>{this.state.temp_lon}</div>
							</div>
							<div id = { style.Birmingham }>
								<div>Birmingahm, GB</div>
								<div>{this.miniWeatherImage(this.state.main_bir)}</div>
								<div>{this.state.temp_bir}</div>
							</div>
							<div id = { style.Manchester }>
								<div>Manchester, GB</div>
								<div>{this.miniWeatherImage(this.state.main_man)}</div>
								<div>{this.state.temp_man}</div>
							</div>
							<div id = { style.Cambridge }>
								<div>Cambridge, GB</div>
								<div>{this.miniWeatherImage(this.state.main_cam)}</div>
								<div>{this.state.temp_cam}</div>
							</div>
							<div id = { style.Leicester }>
								<div>Leicester, GB</div>
								<div>{this.miniWeatherImage(this.state.main_lei)}</div>
								<div>{this.state.temp_lei}</div>
							</div>
							<div id = { style.Bristol }>
								<div>Bristol, GB</div>
								<div>{this.miniWeatherImage(this.state.main_bri)}</div>
								<div>{this.state.temp_bri}</div>
							</div>
							<div id = { style.Oxford }>
								<div>Oxford, GB</div>
								<div>{this.miniWeatherImage(this.state.main_oxf)}</div>
								<div>{this.state.temp_oxf}</div>
							</div>
						</div>
					</div>
					<div class={ style.details }></div>
				</div>
			);
		} else if (this.state.on_weekly_weather_page == true) {
			return (
				<div class={ style.container }>
					<div class={ style.header }>
						<div class={ style.navigation } style="text-align: centre;">
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_weekly_weather_page: false, on_home_page: true })}>Home</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_weekly_weather_page: false, on_location_page: true })}>Location</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button}>Week</button> : null } </div>
						</div>
					</div>
						<div class = {style.weeklyWeather}>
							<div id = {style.Day}>
								<p class="Daily Forecast"> Daily Forecast </p>
								<hr></hr>
								<div><p>{this.state.date_time}</p><p>{this.state.main}</p></div>
								<div><p>{this.state.date_time2}</p><p>{this.state.main2}</p></div>
								<div><p>{this.state.date_time3}</p><p>{this.state.main3}</p></div>
								<div><p>{this.state.date_time4}</p><p>{this.state.main4}</p></div>
								<div><p>{this.state.date_time5}</p><p>{this.state.main5}</p></div>

							<div>

							</div>
							</div>
						</div>
					<div class={ style.details }></div>
					<div class= { style_iphone.container }> 
						{ this.state.display ? this.fetchWeatherData() : null }
					</div>
				</div>
			);
		}
	}

	parseResponse = (parsed_json) => {
		var city = parsed_json['city']['name'];
		var country = parsed_json['city']['country'];
		var temp_c = parsed_json['list']["0"]['main']['temp'];
		var main_weather_current = parsed_json['list']["0"]['weather']["0"]['main'];
		var conditions = parsed_json['list']["0"]['weather']["0"]['description'];
		var precipitation = parsed_json['list']["0"]['pop'];
		var wind_speed = parsed_json['list']["0"]['wind']['speed'];
		var date = new Date(parsed_json['list']["0"]['dt_txt']);
		var date2 = new Date(parsed_json['list']["8"]['dt_txt']);
		var date3 = new Date(parsed_json['list']["16"]['dt_txt']);
		var date4 = new Date(parsed_json['list']["24"]['dt_txt']);
		var date5 = new Date(parsed_json['list']["32"]['dt_txt']);
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var dayOfWeek = days[date.getDay()];
		var day2OfWeek = days[date2.getDay()];
		var day3OfWeek = days[date3.getDay()];
		var day4OfWeek = days[date4.getDay()];
		var day5OfWeek = days[date5.getDay()];
		var main_weather2 = parsed_json['list']["8"]['weather']["0"]['main'];
		var main_weather3 = parsed_json['list']["16"]['weather']["0"]['main'];
		var main_weather4 = parsed_json['list']["24"]['weather']["0"]['main'];
		var main_weather5 = parsed_json['list']["32"]['weather']["0"]['main'];


		var main_weather_6h = parsed_json['list']["2"]['weather']["0"]['main'];
		var main_weather_12h = parsed_json['list']["4"]['weather']["0"]['main'];
		var main_weather_24h = parsed_json['list']["8"]['weather']["0"]['main'];

		var temp_london = parsed_json['list']["0"]['main']['temp'];
		var main_weather_london = parsed_json['list']["0"]['weather']["0"]['main'];

		var temp_birmingham = parsed_json['list']["1"]['main']['temp'];
		var main_weather_birmingham = parsed_json['list']["1"]['weather']["0"]['main'];

		var temp_manchester = parsed_json['list']["2"]['main']['temp'];
		var main_weather_manchester = parsed_json['list']["2"]['weather']["0"]['main'];

		var temp_cambridge = parsed_json['list']["3"]['main']['temp'];
		var main_weather_cambridge = parsed_json['list']["3"]['weather']["0"]['main'];

		var temp_leicester = parsed_json['list']["4"]['main']['temp'];
		var main_weather_leicester = parsed_json['list']["4"]['weather']["0"]['main'];

		var temp_bristol = parsed_json['list']["5"]['main']['temp'];
		var main_weather_bristol = parsed_json['list']["5"]['weather']["0"]['main'];

		var temp_oxford = parsed_json['list']["6"]['main']['temp'];
		var main_weather_oxford = parsed_json['list']["6"]['weather']["0"]['main'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: city + ", " + country,
			/*
			Maybe create a dropdown list in Locations page for user to add custom locations?
			- London
			- Birmingham
			- Manchester
			- Cambridge
			- Leicester
			- Bristol
			- Oxford
			*/
			temp: Math.trunc(temp_c - 273.15), // convert temp from kelvin to celsius
			cond : conditions,
			main: main_weather_current,
			/*
			URL: https://openweathermap.org/weather-conditions
			Main weather conditions:
			- Clear
			- Clouds
			- Rain
			- Thunderstorm
			- Drizzle
			- Snow
			- all under 'Atmosphere' (same weather icon):
			- Mist
			- Smoke
			- Haze
			- Fog
			*/
			prec : (precipitation * 100) + "%", // convert range 0-1 to a percentage
			wspeed: Math.trunc(wind_speed) + " mph",
			main_6h : main_weather_6h,
			main_12h : main_weather_12h,
			main_24h : main_weather_24h,
			main_lon : main_weather_london,
			main_bir : main_weather_birmingham,
			main_man : main_weather_manchester,
			main_cam : main_weather_cambridge,
			main_lei : main_weather_leicester,
			main_bri : main_weather_bristol,
			main_oxf : main_weather_oxford,
			temp_lon : Math.trunc(temp_london - 273.15),
			temp_bir : Math.trunc(temp_birmingham - 273.15),
			temp_man : Math.trunc(temp_manchester - 273.15),
			temp_cam : Math.trunc(temp_cambridge - 273.15),
			temp_lei : Math.trunc(temp_leicester - 273.15),
			temp_bri : Math.trunc(temp_bristol - 273.15),
			temp_oxf : Math.trunc(temp_oxford - 273.15),
			// date_time: date,
			// date_time2: date2,
			date_time: dayOfWeek,
			date_time2: day2OfWeek,
			date_time3: day3OfWeek,
			date_time4: day4OfWeek,
			date_time5: day5OfWeek,
			main2: main_weather2,
			main3: main_weather3,	
			main4: main_weather4,	
			main5: main_weather5
		});
	}
}