import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import HeaderComponent from './HeaderComponent'


function changeDate(date){
	return new Date(date).toString().substr(3,13)
}

function Showdate(props){
return <h2 id="holiday-date">{changeDate(props.today3[0].date.iso)}</h2>

}


function InsideTodayComponent(props){

	if(props.today2.length>0)
	var t=<><h2>Hey , You Got Holiday Today</h2><Showdate today3={props.today2}/>{props.today2.map((item)=><div className="todayholiday-div">
<p>{item.name}</p><button id="holiday-button">{item.type[0]}</button></div>)}</>
		else{
			if(props.today2.length==0 && props.isLoaded==true)
			var t=<p id="noholiday">No Holiday Today</p>
			else
				var t=<p></p>
	}
return (
t
)
}

export default InsideTodayComponent
