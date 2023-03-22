// import preact
import { h, render, Component } from 'preact';

// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';

export default class Ipad extends Component {

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

	/*
	URL to use for location page: http://api.openweathermap.org/data/2.5/group?id=2643743,2655603,2643123,2653941,2644668,2654675,2640729&units=metric&appid=5065eab2c0c7e99992ba98ce43ab3e2c
	City IDs:
		London - 2643743
		Birmingham - 2655603
		Manchester - 2643123
		Cambridge - 2653941
		Leicester - 2644668
		Bristol - 2654675
		Oxford - 2640729
	*/

	// get the user's current location
	componentDidMount()
	{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
		} else {
			console.log("Geolocation is not supported.");
		}
	}

	// if the user is on the homepage, fetch the weather data using the coordinates from navigator.geolocation
	showPosition = (position) => {
		if (this.state.on_home_page) {
			const { latitude, longitude } = position.coords;
			const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=5065eab2c0c7e99992ba98ce43ab3e2c`;
			this.fetchWeatherData(url);
		}
		const url = "http://api.openweathermap.org/data/2.5/group?id=2643743,2655603,2643123,2653941,2644668,2654675,2640729&units=metric&appid=5065eab2c0c7e99992ba98ce43ab3e2c";
		this.fetchWeatherData(url);
	}
	
	// if the user blocks location access, make the home page show London`s weather by default
	showError = (error) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=5065eab2c0c7e99992ba98ce43ab3e2c`;
		this.fetchWeatherData(url);
	}

	// methods to fetch weather data and catche any errors if API call fails
	fetchWeatherData = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.parseResponse(data);
				this.setState({ display: false, data_grabbed: true });
			})
			.catch(error => console.log(`API call failed: ${error}`));
	}

	// decide what image to show depending on the main weather
  	mainWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
		return <img id="clear-icon" src="./assets/icons/sunny_bg_ipad.svg" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
		return <img id="cloudy-icon" src="./assets/icons/cloudy_bg_ipad.svg" alt="Cloudy Icon"></img>
		} else if (main_weather == "Rain") {
		return <img id="rainy-icon" style="width:475px;" src="./assets/icons/rainy_background_ipad.svg" alt="Rainy Icon"></img>
		} else if (main_weather == "Thunderstorm") {
		return <img id="thunderstorm-icon" src="./assets/icons/thunderstorm_bg_ipad.svg" alt="Thunderstorm Icon"></img>
		} else if (main_weather == "Drizzle") {
		return <img id="drizzle-icon" src="./assets/icons/drizzle_bg_ipad.svg" alt="Drizzle Icon"></img>
		} else if (main_weather == "Snow") {
		return <img id="snow-icon" src="./assets/icons/snow_bg_ipad.svg" alt="Snow Icon"></img>
		} else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
		return <img id="atmosphere-icon" src="./assets/icons/misty_bg_ipad.svg" alt="Atmosphere Icon"></img>
		}
  }

  	// decide what image to show depending on the weather in the 6h,12h,24h forecast section
	miniWeatherImage = (main_weather) => {
		if (main_weather == "Clear") {
			return <img id="clear-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/sunny_svg.svg" alt="Clear Icon"></img>
		} else if (main_weather == "Clouds") {
			return <img id="cloudy-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/cloudy_svg.svg" alt="Cloudy Icon"></img>
		} else if (main_weather == "Rain") {
			return <img  id="rainy-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/rainy_svg.svg" alt="Rainy Icon"></img>
		} else if (main_weather == "Thunderstorm") {
			return <img id="thunderstorm-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/thunderstorm_svg.svg" alt="Thunderstorm Icon"></img>
		} else if (main_weather == "Drizzle") {
			return <img id="drizzle-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/drizzle_svg.svg" alt="Drizzle Icon"></img>
		} else if (main_weather == "Snow") {
			return <img id="snow-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/snow_svg.svg" alt="Snow Icon"></img>
		} else if (main_weather == "Mist" || main_weather == "Smoke" || main_weather == "Haze" || main_weather == "Fog") {
			return <img id="atmosphere-icon" style="width:60px; filter: invert(85%);" src="./assets/icons/foggy_svg.svg" alt="Atmosphere Icon"></img>
		}
	}

	// when the user selects a location from the dropdown list, render the content of the chosen location
	displayLocationSection = (value, divID) => {
		if((value) == "London") { 
			document.getElementById(divID).innerHTML = document.getElementById('content_London').innerHTML
		} else if ((value) == "Birmingham") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Birmingham').innerHTML
		} else if ((value) == "Manchester") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Manchester').innerHTML
		} else if ((value) == "Cambridge") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Cambridge').innerHTML
		} else if ((value) == "Leicester") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Leicester').innerHTML
		} else if ((value) == "Bristol") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Bristol').innerHTML
		} else if ((value) == "Oxford") {
			document.getElementById(divID).innerHTML = document.getElementById('content_Oxford').innerHTML
		} else {
			document.getElementById(divID).innerHTML = document.getElementById('content_Empty').innerHTML
		}
	}

	// the main render method for the ipad component
	render() {
		// when app is opened or the home button is clicked, the state is set to true so the home page is visible
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
								{this.state.data_grabbed ? <h3 class={style.weatherLabel}>Precipitation</h3> : null}
							</div>
							<div class={ style.precipitation }>
								{ this.state.data_grabbed ? <img id="rainy-icon" style="padding:0px;padding-right: 160px; vertical-align: bottom; filter: invert(85%);" src="./assets/icons/pop_svg.svg" alt="Raining Icon"></img> : null }
								{ this.state.prec }
							</div>
							<div id="windspeed">
								{this.state.data_grabbed ? <h3 class={style.weatherLabel}>Wind Speed</h3> : null}
							</div>
							<div class={ style.windspeed }>
								{ this.state.data_grabbed ? <img id="windspeed-icon"  src="./assets/icons/windspeed_svg.svg" alt="Wind Speed Icon" style="padding:0; margin:0;padding-right: 135px; vertical-align: bottom; filter: invert(85%);"></img> : null }
								{ this.state.wspeed }
							</div>
						</div>
						<h3 class={style.forecast} style="margin-left:155px; padding-bottom:-3%; margin-top:1%;"> Forecast</h3> 
						<div> 
							{ this.state.data_grabbed ? <button class={style.Weeklybutton} onClick={() => this.setState({ on_home_page:false, on_weekly_weather_page: true })}>Week</button> : null }
						</div>
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
					<div class= { style_ipad.container }> 
						{ this.state.display ? this.fetchWeatherData() : null }
					</div>
				</div>
			);
		}
		// if the location button is pressed, the state is set to true so the location page is visible
		else if (this.state.on_location_page == true) {
			return (
				<div class={ style.container }>
					<div class={ style.header }>
						<div class={ style.navigation } style="text-align: centre;">
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_location_page: false, on_home_page: true })}>Home</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button}>Location</button> : null } </div>
						</div>
						{this.fetchWeatherData()}
						<div class = { style.locations_page }>
						<h2 class={style.locationTitle}> Select Locations</h2>
						<div class={style.LocationDropDown}>
							<select class = {style.dropdownList}  onChange={(e) => this.displayLocationSection(e.target.value, "location1_content")}>
								<option value="">Select</option>
								<option value="London">London</option>
								<option value="Birmingham">Birmingham</option>
								<option value="Manchester">Manchester</option>
								<option value="Cambridge">Cambridge</option>
								<option value="Leicester">Leicester</option>
								<option value="Bristol">Bristol</option>
								<option value="Oxford">Oxford</option>
							</select>
							<div id = "location1_content"></div>
						</div>
						<div class={style.LocationDropDown}>
							<select class = {style.dropdownList}  onChange={(e) => this.displayLocationSection(e.target.value, "location2_content")}>
								<option value="">Select</option>
								<option value="London">London</option>
								<option value="Birmingham">Birmingham</option>
								<option value="Manchester">Manchester</option>
								<option value="Cambridge">Cambridge</option>
								<option value="Leicester">Leicester</option>
								<option value="Bristol">Bristol</option>
								<option value="Oxford">Oxford</option>
							</select>
							<div id = "location2_content"></div>
						</div>
						<div class={style.LocationDropDown}>
							<select class = {style.dropdownList} onChange={(e) => this.displayLocationSection(e.target.value, "location3_content")}>
								<option value="">Select</option>
								<option value="London">London</option>
								<option value="Birmingham">Birmingham</option>
								<option value="Manchester">Manchester</option>
								<option value="Cambridge">Cambridge</option>
								<option value="Leicester">Leicester</option>
								<option value="Bristol">Bristol</option>
								<option value="Oxford">Oxford</option>
							</select>
							<div id = "location3_content"></div>
						</div>
						<div class={style.LocationDropDown}>
							<select class = {style.dropdownList} onChange={(e) => this.displayLocationSection(e.target.value, "location4_content")}>
								<option value="">Select</option>
								<option value="London">London</option>
								<option value="Birmingham">Birmingham</option>
								<option value="Manchester">Manchester</option>
								<option value="Cambridge">Cambridge</option>
								<option value="Leicester">Leicester</option>
								<option value="Bristol">Bristol</option>
								<option value="Oxford">Oxford</option>
							</select>
							<div id = "location4_content"></div>
						</div>
						<div class={style.LocationDropDown}>
							<select class = {style.dropdownList} onChange={(e) => this.displayLocationSection(e.target.value, "location5_content")}>
								<option value="">Select</option>
								<option value="London">London</option>
								<option value="Birmingham">Birmingham</option>
								<option value="Manchester">Manchester</option>
								<option value="Cambridge">Cambridge</option>
								<option value="Leicester">Leicester</option>
								<option value="Bristol">Bristol</option>
								<option value="Oxford">Oxford</option>
							</select>
							<div id = "location5_content"></div>
						</div>
						</div>
						<div class = { style.locations_content } style = "display: none">
							<div id = "content_London" class={style.locationBars}>
								<p class={style.locationDesc}>London, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_lon)}</span>
								<div class={style.locationTemp}>{this.state.temp_lon}</div>
							</div>
							<div id = "content_Birmingham" class={style.locationBars}>
								<p class={style.locationDesc}>Birmingham, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_bir)}</span>
								<div class={style.locationTemp}>{this.state.temp_bir}</div>
							</div>
							<div id = "content_Manchester" class={style.locationBars}>
								<p class={style.locationDesc}>Manchester, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_man)}</span>
								<div class={style.locationTemp}>{this.state.temp_man}</div>
							</div>
							<div id = "content_Cambridge" class={style.locationBars}>
								<p class={style.locationDesc}>Cambridge, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_cam)}</span>
								<div class={style.locationTemp}>{this.state.temp_cam}</div>
							</div>
							<div id = "content_Leicester" class={style.locationBars}>
								<p class={style.locationDesc}>Leicester, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_lei)}</span>
								<div class={style.locationTemp}>{this.state.temp_lei}</div>
							</div>
							<div id = "content_Bristol" class={style.locationBars}>
								<p class={style.locationDesc}>Bristol, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_bri)}</span>
								<div class={style.locationTemp}>{this.state.temp_bri}</div>
							</div>
							<div id = "content_Oxford" class={style.locationBars}>
								<p class={style.locationDesc}>Oxford, GB </p>
								<span class={style.locationImg}>{this.miniWeatherImage(this.state.main_oxf)}</span>
								<div class={style.locationTemp}>{this.state.temp_oxf}</div>
							</div>
							<div id = "content_Empty" class={style.locationBars}></div>
						</div>
					</div>
					<div class={ style.details }></div>
				</div>
			);
		}
		// if the week button is pressed, the state is set to true so the weekly forecast page is visible
		else if (this.state.on_weekly_weather_page == true) {
			return (
				<div class={ style.container }>
					<div class={ style.header }>
						<div class={ style.navigation } style="text-align: centre;">
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_weekly_weather_page: false, on_home_page: true })}>Home</button> : null } </div>
							<div> { this.state.data_grabbed ? <button class={style.button} onClick={() => this.setState({ on_weekly_weather_page: false, on_location_page: true })}>Location</button> : null } </div>
						</div>
					</div>
						<div class = {style.weeklyWeather}>
							<div class ={style.conta}> 
								<h2 class={style.weeklyForecast}> 5 Day Forecast</h2>
								<hr></hr>
								<div class={ style.cityWeekly }>
								{ this.state.locate }
								</div>
								<br></br>
								<div class={style.Days}>
									<p class={style.timeDate}>{this.state.date_time} </p>
									{ this.state.data_grabbed ? this.miniWeatherImage(this.state.main): null }
									<p class={style.weeklyDesc}> {this.state.main} {this.state.temp}</p>
								</div>
								<div class={style.Days}><p class={style.timeDate}>{this.state.date_time2} </p> { this.state.data_grabbed ? this.miniWeatherImage(this.state.main2): null } <p class={style.weeklyDesc}> {this.state.main2}  {this.state.temp_day2}</p></div>
								<div class={style.Days}><p class={style.timeDate}>{this.state.date_time3} </p> { this.state.data_grabbed ? this.miniWeatherImage(this.state.main3): null } <p class={style.weeklyDesc}> {this.state.main3}  {this.state.temp_day3}</p></div>
								<div class={style.Days}><p class={style.timeDate}>{this.state.date_time4} </p> { this.state.data_grabbed ? this.miniWeatherImage(this.state.main4): null } <p class={style.weeklyDesc}> {this.state.main4}  {this.state.temp_day4}</p></div>
								<div class={style.FinalDay}><p class={style.timeDate}>{this.state.date_time5} </p> { this.state.data_grabbed ? this.miniWeatherImage(this.state.main5): null }<p class={style.weeklyDesc}> {this.state.main5}  {this.state.temp_day5}</p></div>
								<br></br>
							</div>
								<div class={style.bottomOfWeek}></div>
						</div>
					<div class={ style.details }></div>
				</div>
			);
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

		// variables for the weekly page
		var date = new Date(parsed_json['list']["0"]['dt_txt']);
		var date2 = new Date(parsed_json['list']["8"]['dt_txt']);
		var date3 = new Date(parsed_json['list']["16"]['dt_txt']);
		var date4 = new Date(parsed_json['list']["24"]['dt_txt']);
		var date5 = new Date(parsed_json['list']["32"]['dt_txt']);
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var day_of_week = days[date.getDay()];
		var day2_of_week = days[date2.getDay()];
		var day3_of_week = days[date3.getDay()];
		var day4_of_week = days[date4.getDay()];
		var day5_of_week = days[date5.getDay()];
		var main_weather2 = parsed_json['list']["8"]['weather']["0"]['main'];
		var main_weather3 = parsed_json['list']["16"]['weather']["0"]['main'];
		var main_weather4 = parsed_json['list']["24"]['weather']["0"]['main'];
		var main_weather5 = parsed_json['list']["32"]['weather']["0"]['main'];
		var temp_c_day2 = parsed_json['list']["8"]['main']['temp'];
		var temp_c_day3 = parsed_json['list']["16"]['main']['temp'];
		var temp_c_day4 = parsed_json['list']["24"]['main']['temp'];
		var temp_c_day5 = parsed_json['list']["32"]['main']['temp'];


		// variables for the forecast on the home page
		var main_weather_6h = parsed_json['list']["2"]['weather']["0"]['main'];
		var main_weather_12h = parsed_json['list']["4"]['weather']["0"]['main'];
		var main_weather_24h = parsed_json['list']["8"]['weather']["0"]['main'];

		// variables for the location page
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

		// set states for fields so they could be rendered later on in the pages
		this.setState({
			locate: city + ", " + country,
			temp: Math.trunc(temp_c - 273.15), // convert temp from kelvin to celsius
			cond : conditions,
			main: main_weather_current,
			prec : Math.trunc((precipitation * 100)) + "%", // convert range 0-1 to a percentage
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

			date_time: day_of_week,
			date_time2: day2_of_week,
			date_time3: day3_of_week,
			date_time4: day4_of_week,
			date_time5: day5_of_week,

			main2: main_weather2,
			main3: main_weather3,	
			main4: main_weather4,	
			main5: main_weather5,

			temp_day2: Math.trunc(temp_c_day2 - 273.15),
			temp_day3: Math.trunc(temp_c_day3 - 273.15),
			temp_day4: Math.trunc(temp_c_day4 - 273.15),
			temp_day5: Math.trunc(temp_c_day5 - 273.15)
		});
	}
}
