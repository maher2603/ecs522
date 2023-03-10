// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// set the temperature, button display and data grabbed state
		this.state = {
			temp : "",
			display : true,
			data_grabbed : false
		}
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// Alternate API Key: 5065eab2c0c7e99992ba98ce43ab3e2c
		var url = "https://api.openweathermap.org/data/2.5/forecast?q=London,GB&appid=8b5c4801c0233c9cfc2aae8f69b6cdba";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data is grabbed, hide the button and set it to true
		this.setState({ display: false });
		this.setState({ data_grabbed : true });
	}

	// decide what image to show depending on the main weather
	mainWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
			return <img id="clear-icon" src="./assets/icons/clear.png" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
			return <img id="cloudy-icon" src="./assets/icons/cloudy.png" alt="Cloudy Icon"></img>
		} else if (main_weather == "Rain") {
			return <img id="rainy-icon" src="./assets/icons/rainy.png" alt="Rainy Icon"></img>
		} else if (main_weather == "Thunderstorm") {
			return <img id="thunderstorm-icon" src="./assets/icons/thunderstorm.png" alt="Thunderstorm Icon"></img>
		} else if (main_weather == "Drizzle") {
			return <img id="drizzle-icon" src="./assets/icons/drizzle.png" alt="Drizzle Icon"></img>
		} else if (main_weather == "Snow") {
			return <img id="snow-icon" src="./assets/icons/snow.png" alt="Snow Icon"></img>
		} else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
			return <img id="atmosphere-icon" src="./assets/icons/atmosphere.png" alt="Atmosphere Icon"></img>
		}
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>
						{ this.state.locate }
					</div>
					<div class={ style.conditions } hidden>
						{ this.state.cond }
					</div>
					<span class={ tempStyles }>
						{ this.state.temp }
					</span>
					<div>
						{ this.state.data_grabbed ? this.mainWeatherImage(this.state.main): null }
						{ this.state.main }
					</div>
					<div class={ style.precipitation }>
						{ this.state.data_grabbed ? <img id="rainy-icon" src="./assets/icons/rainy.png" alt="Raining Icon"></img> : null }
						{ this.state.prec }
					</div>
					<div class={ style.windspeed }>
						{ this.state.data_grabbed ? <img id="windspeed-icon" src="./assets/icons/windspeed.png" alt="Wind Speed Icon"></img> : null }
						{ this.state.wspeed }
					</div>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var city = parsed_json['city']['name'];
		var country = parsed_json['city']['country'];
		var temp_c = parsed_json['list']['0']['main']['temp'];
		var main_weather = parsed_json['list']['0']['weather']['0']['main']
		var conditions = parsed_json['list']['0']['weather']['0']['description'];
		var precipitation = parsed_json['list']['0']['pop']
		var wind_speed = parsed_json['list']['0']['wind']['speed'];


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
			prec : "Precipitation: " + (precipitation * 100) + "%", // convert range 0-1 to a percentage
			wspeed: "Wind Speed: " + Math.trunc(wind_speed) + " mph"
		});
	}
}