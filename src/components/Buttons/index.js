// import preact
import { h, render, Component } from 'preact';
import { useState} from 'preact/hooks'
	
export default class Button extends Component {

	// rendering a function when the button is clicked
	render() {
        const[buttonState,setButtonState] = useState(false)
        const handleClick = () => {
            setButtonState(buttonState => !buttonState)
          }
		return (
			<div>
				<button onClick={handleClick}>
				</button>
			</div>
		);
	}
}