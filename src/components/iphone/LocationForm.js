import { h, Component } from 'preact';

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const location = formData.get('location');
    this.setState({ location });
    this.props.onLocationSubmit(location);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


export default LocationForm;