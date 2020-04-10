import React from "react";
import "./App.css";
import HeaderComponent from "./HeaderComponent";
import PassedHolidayComponent from "./PassedHolidayComponent";
import UpcomingHolidayComponent from "./UpcomingHolidayComponent";
import TodayComponent from "./TodayComponent";
import InsideModalComponent from "./InsideModalComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickeddate: null,
      shown: 0,
      error: null,
      isLoaded: false,
      bgcolor: "",
      bgcolorheader1: "rgba(0,0,0,.6)",
      bgcolorheader2: "rgba(0,0,0,.2)",
      holidays: [],
      today: [],
      passed: [],
      upcoming: [],
      holidaymodalonoff: "off"
    };

    this.changeDisplay1 = this.changeDisplay1.bind(this);
    this.changeDisplay0 = this.changeDisplay0.bind(this);
    this.showHideModal = this.showHideModal.bind(this);
    this.collectDataForClick = this.collectDataForClick.bind(this);
  }

  componentDidMount() {
    fetch(
      'https://calendarific.com/api/v2/holidays?country=IN&year='+new Date().getFullYear()+"&api_key=efb5d27ee82d7cb28b83f6f25a1722224f89b4cfdb3b38d26a823a1648049213"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            holidays: result.response.holidays,
            today: result.response.holidays.filter(item => {
              return(item.date.iso.substr(0, 10) ===new Date().toISOString().substr(0, 10))
            }),
            passed: result.response.holidays.filter(item => {
              return (new Date(item.date.iso) < new Date())
            }),
            upcoming: result.response.holidays.filter(item => {
              return (new Date(item.date.iso) > new Date())
            })
          });
          //checking if todaY IS HOLIDAY
        },
        error => {
          this.setState({
            isLoaded: false,
            error: "Erorr Loading Data"
          });
          console.log(this.state.error);
        }
      );
  }

  changeDisplay0() {
    this.setState({
      shown: 0,
      bgcolorheader2: "rgba(0,0,0,.2)",
      bgcolorheader1: "rgba(0,0,0,.7)"
    });
  }

  changeDisplay1() {
    this.setState({
      shown: 1,
      bgcolorheader2: "rgba(0,0,0,.7)",
      bgcolorheader1: "rgba(0,0,0,.2)"
    });
  }

  //for collecting multiple date on click on single date

  collectDataForClick(data) {
    this.allinfo = [];
    this.state.holidays.filter(item => {
      if (item.date.iso.substr(0, 10) === data.date.iso.substr(0, 10))
        this.allinfo.push(item);
    });
  }

  showHideModal(data) {
    this.dataforfilter = data;
    //to stop close button in modal to call this
    if (this.state.holidaymodalonoff === "off")
      this.collectDataForClick(this.dataforfilter);

    this.setState({
      holidaymodalonoff: this.state.holidaymodalonoff === "off" ? "on" : "off",
      bgcolor: this.state.bgcolor === "" ? "rgba(0,0,0,.9)" : ""
    });
  }

  render() {
    console.log(this.state.upcoming)
    this.LoadingMessage=(this.state.isLoaded === false)?"Loading ...":""
    if (this.state.error === "Erorr") this.LoadingMessage = "";

    if (this.state.shown === 1)
      this.showdatesdiv = (
        <PassedHolidayComponent
          passedholidays={this.state.passed}
          showHideModal={this.showHideModal}
          clickeddate={this.state.clickeddate}
        />
      );
    else
      this.showdatesdiv = (
        <UpcomingHolidayComponent
          loadingmessage={this.LoadingMessage}
          upcomingholidays={this.state.upcoming}
          errormessage={this.state.error}
          showHideModal={this.showHideModal}
          clickeddate={this.state.clickeddate}
        />
      );

    if (this.state.holidaymodalonoff === "off")
      this.holidaydescriptionmodal = "";
    else
      this.holidaydescriptionmodal = (
        <div className="holiday-modal">
          <InsideModalComponent holidays={this.allinfo} />
          <button id="close-button" onClick={this.showHideModal}>
            Close
          </button>
        </div>
      );

    return (
      <div className="main-div" style={{ backgroundColor: this.state.bgcolor }}>
        {this.holidaydescriptionmodal}
        <TodayComponent
          today1={this.state.today}
          isLoaded={this.state.isLoaded}
        />
        <HeaderComponent
          changedisplaystatus={this.state.shown}
          onclick0={this.changeDisplay0}
          bgcolorheader1={this.state.bgcolorheader1}
          bgcolorheader2={this.state.bgcolorheader2}
          onclick1={this.changeDisplay1}
        />
        {this.showdatesdiv}
      </div>
    );
  }
}
export default App;
