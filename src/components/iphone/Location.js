// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Location extends Component {

	render() {
		return (
			<div class={ style.container }>
				<div><h1>Location</h1></div>
				<div class={ style.header }>
					<div class={ style.navigation }>
						<div> { this.state.data_grabbed ? <a href = "./components/iphone/index.js"> <button>Home</button> </a>: null } </div>
						<div> { this.state.data_grabbed ? <a href = "./components/iphone/location.js"> <button>Location</button> </a>: null } </div>
					</div>
					
			</div>
		);
	}
}