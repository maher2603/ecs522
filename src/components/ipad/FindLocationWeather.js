import { h, Component } from 'preact';
import LocationForm from './LocationForm.js';

import style from './style';

export default class FindLocationWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      stateMessage : ""
    };
  }

  // API call to get the location, latitude and longitude of the user input
	fetchLocation = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
        if (!data.length){
          this.setState({ stateMessage: "Location is not valid" })
        }
        else {
          this.setState({ location: data[0]["name"] })
          const lat = data[0]["lat"]
          const lon = data[0]["lon"]
          this.props.onLocationFetch(this.state.location, lat, lon);
          this.setState({ stateMessage: "" })
        }
      })
			.catch(this.badUrl);
  }

  // If the user puts in an invalid location
  badUrl = (error) => {
    this.setState({ stateMessage: "Location is not valid" })
  }

  // When the user submits their location
  handleLocationSubmit = (location) => {
    const url = "http://api.openweathermap.org/geo/1.0/direct?q="+location+"&limit=7&appid=5065eab2c0c7e99992ba98ce43ab3e2c";
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