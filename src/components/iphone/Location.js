// import preact
import { h, render, Component } from 'preact';
import { Link } from 'preact-router/match';
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
			<div>
			<h1>Location</h1>
			<link href="WeeklyWeather"> Go to Weekly Weather</link>
			</div>
		);
	}
}