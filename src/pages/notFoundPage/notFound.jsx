
import React,{Component} from "react";
import {Link} from "react-router";

export default class NotFound extends Component{
	constructor(props) {
		super(props);
		this.state = {};
  }

	render(){
		return <div className="not-found-page">
			404
		</div>;
	}
}