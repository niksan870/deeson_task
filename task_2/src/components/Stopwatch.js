import React, { Component } from "react";
import Times from "./Times";
import Controller from "./Controller";
import "./Stopwatch.css";
import { connect } from "react-redux";
import { lap, resetLaps } from "../actions"

class Stopwatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeLabel: "Stopwatch",
      isStart: false,
      timerInterval: null,
      minuteCounter: Number.parseInt(this.props.defaultSessionLength, 10),
      timeCounter: 0,
      humanReadableTime: "00:00:00:00"
    }
  }

  onLap = () => {
    this.props.lap(this.constructHumanReadableTime(this.state.timeCounter))
  }

  onReset = () => {
    // this.props.resetLaps()
    this.setState({
      ...this.state,
      isStart: false,
      timeCounter: 0,
      humanReadableTime: "00:00:00:00"
    });

    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStart = (e) => {
    let isStart = this.state.isStart;
    this.setState({
      ...this.state,
      timerInterval: setInterval(() => {
        this.increaseTimer();
      }, 10),
      isStart: !isStart,
    });
  }

  increaseTimer = () => {
    let combinedTime = this.state.timeCounter + 10;
    this.setState({
      ...this.state,
      timeCounter: combinedTime,
      humanReadableTime: this.constructHumanReadableTime(combinedTime)
    });
  }

  constructHumanReadableTime = (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 10),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
  }

  onStop = () => {
    this.state.timerInterval && clearInterval(this.state.timerInterval);
    this.setState({
      ...this.state,
      isStart: !this.state.isStart,
      timerInterval: null,
    })
  }

  render() {
    return (
      <div className="parent_stopwatch">
        <div className="stopwatch">
          <Times
            timeLabel={this.state.timeLabel}
            timeLeftInSecond={this.state.humanReadableTime}
          />
          <Controller
            onStart={this.onStart}
            onLap={this.onLap}
            onStop={this.onStop}
            onReset={this.onReset}
            isStart={this.state.isStart}
          />
        </div>
        {this.props.laps.length !== 0 ?
          <div id="lap_history">
            <h2>Lap History</h2>
            <ol>
              {this.props.laps.map((value, index) => {
                return <li key={index}>{value}</li>
              })}
            </ol>
            <button onClick={() => this.props.resetLaps()}>Clear History</button>
          </div> : null
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    laps: state.laps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    lap: (payload) => dispatch(lap(payload)),
    resetLaps: (payload) => dispatch(resetLaps(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
