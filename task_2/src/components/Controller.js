import React from 'react';
import './Controller.css';

let Controller = (props) => (
  <div className="controller">
    {props.isStart ?
      <button id="lap" onClick={props.onLap}>Lap</button> :
      <button id="start_stop" onClick={props.onStart}>Start</button>
    }
    {props.isStart ?
      <button id="stop" onClick={props.onStop}>Stop</button> :
      <button id="reset" onClick={props.onReset}>Reset</button>
    }
  </div>
)

export default Controller