// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class WeeklyWeather extends Component {

	render() {
		return (
			<h1>Weekly Weather</h1>
		);
	}
}