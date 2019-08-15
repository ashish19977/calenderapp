import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
import HeaderComponent from './HeaderComponent'
import InsideTodayComponent from './InsideTodayComponent'

class TodayComponent extends React.Component{
	constructor(props){
		super(props)	
}

render(){
return (
	<div className="today-div">
<InsideTodayComponent today2={this.props.today1} isLoaded={this.props.isLoaded}/>
</div>
)}
}

export default TodayComponent
