import { h, Component } from 'preact';
import LocationForm from './LocationForm.js';

import style from './style';

/*
NOTES:
- This file will do data handling for the location submitted by the file
    - Includes Geocaching location into lang/long
- In the main render part (in the appropriate part of giant If) the same processes for main page will be adapted
    - Might need to remake the main file code into a new file (think about props)
*/

export default class FindLocationWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      stateMessage : ""
    };
  }

	componentDidMount() {
    console.log("findLocation mounted")
  }

	fetchLocation = (url) => {
    console.log("URL is " + url)
		fetch(url)
			.then(response => response.json())
			.then(data => {
        console.log("Data length:" + data.length)
        if (!data.length){
          this.setState({ stateMessage: "Location is not valid" })
        }
        else {
          console.log(data)
          this.setState({ location: data[0]["name"] })
          const lat = data[0]["lat"]
          const lon = data[0]["lon"]
          this.props.onLocationFetch(this.state.location, lat, lon);
          this.setState({ stateMessage: "" })
        }
      })
			.catch(this.badUrl);
  }

  badUrl = (error) => {
    console.log("Bad url: " + error)
    this.setState({ stateMessage: "Location is not valid" })
  }

  handleLocationSubmit = (location) => {
    const url = "http://api.openweathermap.org/geo/1.0/direct?q="+location+"&limit=7&appid=5065eab2c0c7e99992ba98ce43ab3e2c";
    console.log(url)
    this.fetchLocation(url);
  }

  render() {
    return (
      <div class={style.formContainer}>
        <div class={style.formTitle}>Input Location</div>
        <hr></hr> <br></br>
        <LocationForm onLocationSubmit={this.handleLocationSubmit} />
        <div class={style.errorMessage }>{this.state.stateMessage}</div>
      </div>
    );
  }
}