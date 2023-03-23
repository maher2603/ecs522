import { h, Component } from 'preact';

import style from './style';

export default class LocationForm extends Component {
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
        <input class={style.locationInput} type="text" id="location" name="location" />
        <button class={style.locationInputButton} type="submit">Submit</button>
      </form>
    );
  }
}