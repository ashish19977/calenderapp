import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {useState} from  'react'

function removeDuplicateDate(arr){
	console.log(arr)
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
		if(arr[i].date.iso.substr(0,10)===arr[j].date.iso.substr(0,10)){
			arr.splice(i,1)
			i=i-1
		}
	}		
	}
	return arr
}

function ParticularDateComponent(props){
	const [item,setItem]=useState(null)

	function setDateforshow(item){
		setItem(item)
		props.showHideModal(item)
	}

		var div=<div className="passed-holiday-div">{removeDuplicateDate(props.upcomingholidays2).map((item)=><div onClick={()=>{props.showHideModal(item)}} className="particularholiday-div"><span id="p1">{item.date.datetime.day}</span><span id="p2">{getMonth(item.date.datetime.month)}</span></div>)}</div>

	return(div)
}

function getMonth(month){
	var months=[" ","January","Febuary","March",
"April","May","June","July","August","September"
,"October","November","December"]

return months[month]
}

class UpcomingHolidayComponent extends React.Component{
	constructor(props){
		super(props)

	}
render(){

// handing error if occured
	if(this.props.errormessage=="Error Loading Data")
	{
		console.log("yes")
		return(<div className="passed-holiday-div2">{this.props.errormessage}</div>)
	}

	//showing loading message

	if(this.props.upcomingholidays.length==0){
	return (
	<div className="passed-holiday-div2">{this.props.loadingmessage}</div>
)}

//loading page data if everything ok
else{
	return(<ParticularDateComponent upcomingholidays2={this.props.upcomingholidays}  showHideModal={this.props.showHideModal} clickeddate={this.props.clickeddate}/>)
}

}
}

export default UpcomingHolidayComponent
export {removeDuplicateDate}
