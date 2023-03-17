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
		// set the temperature, button display and data grabbed state
		this.state = {
			temp : "",
			display : true,
			data_grabbed : false,
			on_home_page: true,
			on_location_page: false,
			on_weekly_weather_page: false,
			main_weather_6h: "",
			main_weather_12h: "",
			main_Weather_24h: ""
		}
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// Alternate API Key: 8b5c4801c0233c9cfc2aae8f69b6cdba
		var url = "https://api.openweathermap.org/data/2.5/forecast?q=London,GB&appid=5065eab2c0c7e99992ba98ce43ab3e2c";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data is grabbed, hide the button and set it to true
		this.setState({ display: false, data_grabbed : true});
	}

	// decide what image to show depending on the main weather
	mainWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
			return <img id="clear-icon" src="./assets/icons/sunny_svg.svg" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
			return <img id="cloudy-icon" src="./assets/icons/rainy_background.svg" alt="Cloudy Icon"></img>
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
                <div class={ style.conditions } >
                  { this.state.main }
                </div>
                
                <div>
                  { this.state.data_grabbed ? this.mainWeatherImage(this.state.main): null }
                </div>
								<span class={ tempStyles }>
                  { this.state.temp }
                </span>
							</div>
							<div>{this.state.data_grabbed ? <h3>Precipitation</h3> : null}</div>
							<div class={ style.precipitation }>
							{ this.state.data_grabbed ? <img id="rainy-icon" style="padding-right: 100px;" src="./assets/icons/pop_svg.svg" alt="Raining Icon"></img> : null }
							{ this.state.prec }
							</div>
							<div id="windspeed">{this.state.data_grabbed ? <h3 style="text-allign: right">Wind Speed</h3> : null}</div>
							<div class={ style.windspeed }>
							{ this.state.data_grabbed ? <img id="windspeed-icon"  src="./assets/icons/windspeed_svg.svg" alt="Wind Speed Icon"style="padding-right: 80px;"></img> : null }
							{ this.state.wspeed }
							</div>
						</div>
						<div class={ style.forecast }>
							<div>6h</div>
							<div>{ this.state.data_grabbed ? this.mainWeatherImage(this.state.main_weather_6h): null }</div>
							<div>12h</div>
							<div>{ this.state.data_grabbed ? this.mainWeatherImage(this.state.main_weather_12h): null }</div>
							<div>24h</div>
							<div>{ this.state.data_grabbed ? this.mainWeatherImage(this.state.main_Weather_24h): null }</div>
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
					</div>
					<div>
						<h1>Location</h1>
					</div>
					<div class={ style.details }></div>
					<div class= { style_iphone.container }> 
						{ this.state.display ? this.fetchWeatherData() : null }
					</div>
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
					<div>
						<h1>Weekly Weather</h1>
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
		var main_weather = parsed_json['list']["0"]['weather']["0"]['main'];
		var main_6h = parsed_json['list']["2"]['weather']["0"]['main'];
		var main_12h = parsed_json['list']["4"]['weather']["0"]['main'];
		var main_24h = parsed_json['list']["8"]['weather']["0"]['main'];
		var conditions = parsed_json['list']["0"]['weather']["0"]['description'];
		var precipitation = parsed_json['list']["0"]['pop'];
		var wind_speed = parsed_json['list']["0"]['wind']['speed'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: city + ", " + country,
			/*
			Maybe create a dropdown list in Locations page for user to add custom locations?
			- London
			- Birmingham
			- Manchester
			- Camebridge
			- Leicester
			- Bristol
			- Oxford
			- Exeter
			- Nottingham
			- Leeds
			*/
			temp: Math.trunc(temp_c - 273.15), // convert temp from kelvin to celsius
			cond : conditions,
			main: main_weather,
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
			main_weather_6h : main_6h,
			main_weather_12h : main_12h,
			main_Weather_24h : main_24h
		});
	}
}