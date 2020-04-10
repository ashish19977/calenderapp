import React from 'react';
import './App.css';
import {removeDuplicateDate} from './UpcomingHolidayComponent'


function ParticularDateComponent2(props){
		var div=<div className="passed-holiday-div">{removeDuplicateDate(props.passedholidays2).map((item)=><div onClick={()=>{props.showHideModal(item)}} className="particularholiday-div"><span id="p1">{item.date.datetime.day}</span><span id="p2">{getMonth(item.date.datetime.month)}</span></div>)}</div>
	return(div)
}


function getMonth(month){
	var months=[" ","January","Febuary","March",
"April","May","June","July","August","September"
,"October","November","December"]

return months[month]
}


class UpcomingHolidayComponent extends React.Component{
render(){

	return(<ParticularDateComponent2 passedholidays2={this.props.passedholidays} showHideModal={this.props.showHideModal}/>)
}
}

export default UpcomingHolidayComponent
