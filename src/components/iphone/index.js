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
		// set the temperature and button display state
		this.state = {
			temp : "",
			display : true
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
		// once the data is grabbed, hide the button and set on main page to be true
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<span>{ this.state.main }</span>
					<span>{ this.state.prec }</span>
					<span>{ this.state.humid }</span>
					<span>{ this.state.wspeed }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['city']['name'];
		var temp_c = parsed_json['list']['0']['main']['temp'];
		var main_weather = parsed_json['list']['0']['weather']['0']['main']
		var conditions = parsed_json['list']['0']['weather']['0']['description'];
		var precipitation = parsed_json['list']['0']['pop']
		var humidity = parsed_json['list']['0']['main']['humidity'];
		var wind_speed = parsed_json['list']['0']['wind']['speed'];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
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
			main: "Main Weather: " + main_weather,
			/*
			URL: https://openweathermap.org/weather-conditions
			Main weather conditions:
			- Clear
			- Clouds
			- Rain
			- Thunderstorm
			- Drizzle
			- all under 'Atmosphere' (same weather icon):
			- Mist
			- Smoke
			- Haze
			- Fog
			*/
			prec : "Precipitation: " + (precipitation * 100) + "%", // convert range 0-1 to a percentage
			humid : "Humidity: " + humidity + "%",
			wspeed: "Wind Speed: " + Math.trunc(wind_speed) + " mph"
		});
	}
}