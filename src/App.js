import React from 'react';
import './App.css';
import HeaderComponent from './HeaderComponent'
import PassedHolidayComponent from './PassedHolidayComponent'
import UpcomingHolidayComponent from './UpcomingHolidayComponent'
import TodayComponent from './TodayComponent'
import InsideModalComponent from './InsideModalComponent'


class App extends React.Component{
constructor(props){
  super(props)
  this.state={
    name:"ashish",
    clickeddate:null,
    shown:0,
    error:null,
    isLoaded:false,
    LoadingMessage:"",
    bgcolor:"",
    bgcolorheader1:"rgba(0,0,0,.6)",
    bgcolorheader2:"rgba(0,0,0,.2)",
    holidays:[],
    today:[],
    passed:[],
    upcoming:[],
    holidaymodalonoff:"off"
  }

  this.changeDisplay1=this.changeDisplay1.bind(this)
  this.changeDisplay0=this.changeDisplay0.bind(this)
this.showHideModal=this.showHideModal.bind(this)
this.collectDataForClick=this.collectDataForClick.bind(this)

 }

componentDidMount(){
  fetch("https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=efb5d27ee82d7cb28b83f6f25a1722224f89b4cfdb3b38d26a823a1648049213")
  .then(res=>res.json())
  .then(
      (result)=>{
        console.log(result.response)
        this.setState({
          name:"satish",
          isLoaded:true,
          holidays:result.response.holidays,
          today:result.response.holidays.filter((item)=>{ if(item.date.iso.substr(0,10)==new Date().toISOString().substr(0,10))
            return item }),

           passed:result.response.holidays.filter((item)=>{ if(new Date(item.date.iso)<new Date())
            return item }),
            upcoming:result.response.holidays.filter((item)=>{ if(new Date(item.date.iso)>new Date())
            return item })


        })
        //checking if todaY IS HOLIDAY
    console.log("today = ",this.state.today)
    console.log("all = ",this.state.holidays)
     console.log("passed = ",this.state.passed)
      console.log("upocoming  = ",this.state.upcoming)
      },
      (error)=>{
        this.setState({
          isLoaded:false,
          error:"Error Loading Data",
        })
        console.log(this.state.error)
      }
    )
}



 changeDisplay0(){
this.setState({shown:0,bgcolorheader2:"rgba(0,0,0,.2)",bgcolorheader1:"rgba(0,0,0,.7)"})
}

changeDisplay1(){
this.setState({shown:1,bgcolorheader2:"rgba(0,0,0,.7)",bgcolorheader1:"rgba(0,0,0,.2)"})

}


//for collecting multiple date on click on single date

collectDataForClick(data){
  this.allinfo=[]
  this.state.holidays.filter((item)=>{
      if(item.date.iso.substr(0,10)==data.date.iso.substr(0,10))
        this.allinfo.push(item)
  })
   console.log(this.allinfo)
}

showHideModal(data){

  this.dataforfilter=data;
  //to stop close button in modal to call this
  if(this.state.holidaymodalonoff=="off")
    this.collectDataForClick(this.dataforfilter)

  this.setState({holidaymodalonoff:(this.state.holidaymodalonoff=="off")?"on":"off",bgcolor:(this.state.bgcolor=="")?"rgba(0,0,0,.9)":""})
}


  render(){


if(this.state.isLoaded===false)
this.LoadingMessage="Loading ..."
if(this.state.error==="Erorr")
 this.LoadingMessage=""

if(this.state.shown===1)
this.showdatesdiv=<PassedHolidayComponent passedholidays={this.state.passed} showHideModal={this.showHideModal} clickeddate={this.state.clickeddate}/>
else
  this.showdatesdiv=<UpcomingHolidayComponent  loadingmessage={this.LoadingMessage}  upcomingholidays={this.state.upcoming} errormessage={this.state.error}  showHideModal={this.showHideModal} clickeddate={this.state.clickeddate}/>

if(this.state.holidaymodalonoff=="off")
this.holidaydescriptionmodal=""
else
  this.holidaydescriptionmodal=<div className="holiday-modal" ><InsideModalComponent holidays={this.allinfo} /><button id="close-button" onClick={this.showHideModal}>Close</button></div>


  return(
    <>
<div className="main-div"  style={{backgroundColor:this.state.bgcolor}}>{this.holidaydescriptionmodal}<TodayComponent today1={this.state.today} isLoaded={this.state.isLoaded}/><HeaderComponent changedisplaystatus={this.state.shown}
onclick0={this.changeDisplay0} bgcolorheader1={this.state.bgcolorheader1} bgcolorheader2={this.state.bgcolorheader2} onclick1={this.changeDisplay1}/>
{this.showdatesdiv}
</div></>
    )
}}
export default App;
