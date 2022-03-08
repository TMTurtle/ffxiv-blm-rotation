import React from 'react';
import { logView } from "./LogView";
import { timeline } from "./Timeline";
import { skillsWindow } from "./Skills";
import { playbackControl } from "./PlaybackControl";
import { statusDisplay } from "./StatusDisplay";
import {controller} from "../Controller/Controller";

export var setRealTime = inRealTime=>{};
export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			realTime: false,
		}
		this.boundKeyCapture = this.keyCapture.bind(this);
		setRealTime = this.setRealTime.bind(this);
	}
	keyCapture(evt) {
		controller.handleKeyboardEvent(evt);
		evt.preventDefault();
	}
	setRealTime(rt) {
		this.setState({realTime: rt});
	}
	render() {
		return <div className={"container"}>
			{timeline}
			<div className={"container-narrow"}>
				<div className={"keyboardControlled" + (this.state.realTime ? " realTime" : "")}
					 tabIndex={-1}
					 onKeyDown={this.boundKeyCapture}>
					{statusDisplay}
					{skillsWindow}
				</div>
				{playbackControl}
				{logView}
			</div>
		</div>;
	}
}