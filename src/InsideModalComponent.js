import React from 'react';
import './App.css';

function changeDate(date){
	return new Date(date).toString().substr(3,13)
}

function Showdate(props){
return <h2 id="holiday-date">{changeDate(props.today3.date.iso)}</h2>

}


function InsideModalComponent(props){

	var t=<div className="insidemodal-div"><Showdate today3={props.holidays[0]}/>{props.holidays.map((item)=><div className="todayholiday-div">
<p id="holiday-name-in-modal">{item.name}</p><p id="para-description">{item.description}</p><button id="holiday-button">{item.type[0]}</button></div>)}</div>
		
return (
t
)
}

export default InsideModalComponent
