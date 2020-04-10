import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
import InsideTodayComponent from './InsideTodayComponent'

class TodayComponent extends React.Component{
render(){
return (
	<div className="today-div">
<InsideTodayComponent today2={this.props.today1} isLoaded={this.props.isLoaded}/>
</div>
)}
}

export default TodayComponent
