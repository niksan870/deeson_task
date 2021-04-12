import React, { Component } from 'react';
import './Times.css';

export default class Times extends Component {
  render() {
    return (
      <div className="times">
        <div className="times-content">
          {/* <label id="timer-label">{this.props.timeLabel}</label> */}
          <span id="time-left">{this.props.timeLeftInSecond}</span>
        </div>
      </div>
    )
  }
}