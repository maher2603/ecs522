import { h, Component } from 'preact';
import FindLocationWeather from './FindLocationWeather.js';
import style from './style';

export default class InfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location : "",
            data_grabbed : false
        };
    }

	// methods to fetch weather data and catche any errors if API call fails
	fetchWeatherData = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.parseResponse(data);
				this.setState({ data_grabbed: true });
			})
			.catch(error => console.log(`API call failed: ${error}`));
	}

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
  	
	// decide what image to show depending on the weather in the 6h,12h,24h forecast section
	miniWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
			return <img id="clear-icon" style="filter: invert(87.5%);" src="./assets/icons/sunny_svg.svg" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
			return <img id="cloudy-icon" style="filter: invert(87.5%);" src="./assets/icons/cloudy_svg.svg" alt="Cloudy Icon"></img>
		} else if (main_weather == "Rain") {
			return <img id="rainy-icon" style="filter: invert(87.5%);" src="./assets/icons/rainy_svg.svg" alt="Rainy Icon"></img>
		} else if (main_weather == "Thunderstorm") {
			return <img id="thunderstorm-icon" style="filter: invert(87.5%);" src="./assets/icons/thunderstorm_svg.svg" alt="Thunderstorm Icon"></img>
		} else if (main_weather == "Drizzle") {
			return <img id="drizzle-icon" style="filter: invert(87.5%);" src="./assets/icons/drizzle_svg.svg" alt="Drizzle Icon"></img>
		} else if (main_weather == "Snow") {
			return <img id="snow-icon" style="filter: invert(87.5%);" src="./assets/icons/snow_svg.svg" alt="Snow Icon"></img>
		} else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
			return <img id="atmosphere-icon" style="filter: invert(87.5%);" src="./assets/icons/foggy_svg.svg" alt="Atmosphere Icon"></img>
		}
	}
    
    parseResponse = (parsed_json) => {
        // variables that are mainly for the home page
        var city = parsed_json['city']['name'];
        var country = parsed_json['city']['country'];
        var temp_c = parsed_json['list']["0"]['main']['temp'];
        var main_weather_current = parsed_json['list']["0"]['weather']["0"]['main'];
        var conditions = parsed_json['list']["0"]['weather']["0"]['description'];
        var precipitation = parsed_json['list']["0"]['pop'];
        var wind_speed = parsed_json['list']["0"]['wind']['speed'];

        // variables for the forecast on the home page
        var main_weather_6h = parsed_json['list']["2"]['weather']["0"]['main'];
        var main_weather_12h = parsed_json['list']["4"]['weather']["0"]['main'];
        var main_weather_24h = parsed_json['list']["8"]['weather']["0"]['main'];

        // set states for fields so they could be rendered later on in the pages
        this.setState({
            locate: city + ", " + country,
            temp: Math.trunc(temp_c - 273.15), // convert temp from kelvin to celsius
            cond : conditions,
            main: main_weather_current,
            prec : (precipitation * 100) + "%", // convert range 0-1 to a percentage
            wspeed: Math.trunc(wind_speed) + " mph",

            main_6h : main_weather_6h,
            main_12h : main_weather_12h,
            main_24h : main_weather_24h

        });
    }

    showPosition = (location, lat, lon) => {
        this.setState({ location: location })
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5065eab2c0c7e99992ba98ce43ab3e2c`;
        this.fetchWeatherData(url);
	}

    render() {
    if (this.state.data_grabbed == false) {
        return (
        <div>
            <FindLocationWeather onLocationFetch={this.showPosition} />
        </div>
        )
    }
    else {
        console.log(this.state)
        // check if temperature data is fetched, if so add the sign styling to the page
        const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
        const contaStyles = this.state.main ? `${style.conta}` : style.conta2;
        const conta3Styles = this.state.main ? `${style.conta3}` : style.conta2;
        return (
            <div class={ style.container2 }>
                <div class={ style.header }>
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
                            {this.state.data_grabbed ? <h3 class={style.weatherLabel}>Precipitation</h3> : null}
                        </div>
                        <div class={ style.precipitation }>
                            { this.state.data_grabbed ? <img id="rainy-icon" style="padding:0px;padding-right: 160px; vertical-align: bottom; filter: invert(87.5%)" src="./assets/icons/pop_svg.svg" alt="Raining Icon"></img> : null }
                            { this.state.prec }
                        </div>
                        <div id="windspeed">
                            {this.state.data_grabbed ? <h3 class={style.weatherLabel}>Wind Speed</h3> : null}
                        </div>
                        <div class={ style.windspeed }>
                            { this.state.data_grabbed ? <img id="windspeed-icon"  src="./assets/icons/windspeed_svg.svg" alt="Wind Speed Icon"style="padding:0; margin:0;padding-right: 130px; vertical-align: bottom; filter: invert(87.5%)"></img> : null }
                            { this.state.wspeed }
                        </div>
                    </div>
                    <h3 class={style.forecast} style="margin-left:70px; padding-bottom:-3% margin-top:1%; font-size:larger;">
                        Forecast
                    </h3>
                    <div> { this.state.data_grabbed ? <button class={style.Weeklybutton} onClick={() => this.setState({ location:"", data_grabbed: false })}>Reset</button> : null }</div>
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
            </div>
        );
    }
    }
}