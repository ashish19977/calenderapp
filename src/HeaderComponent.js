import React from 'react';
import './App.css';

class App extends React.Component{
  render(){
  return (
    <div className="header-div">
    <div className="upcoming-holiday-header" style={{backgroundColor:this.props.bgcolorheader1}} onClick={this.props.onclick0}>Upcoming Holidays</div>
    <div className="passed-holiday-header" style={{backgroundColor:this.props.bgcolorheader2}} onClick={this.props.onclick1}>Passed Holidays</div>
    </div>
  )}
}

export default App;
