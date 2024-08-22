import React, { Component } from 'react';
import "../stopwatch/style.scss";

export default class Stopwatch extends Component {
  state = {
    hour: 0,
    minutes: 0,
    second: 0,
    intervalId: null,
    intervals: [],
    disabled: false
  };

  start = () => {
    if (!this.state.disabled) {
      const intervalId = setInterval(() => {
        this.setState((prevState) => {
          let { hour, minutes, second } = prevState;

          if (second === 59) {
            second = 0;
            if (minutes === 59) {
              minutes = 0;
              hour += 1;
            } else {
              minutes += 1;
            }
          } else {
            second += 1;
          }

          return { hour, minutes, second };
        });
      }, 10); 
      this.setState({ intervalId, disabled: true });
    }
  };

  stop = () => {
    if (this.state.intervalId) { 
      clearInterval(this.state.intervalId); 
      this.setState({ intervalId: null, disabled: false }); 
    }
  };

  clear = () => {
    this.stop(); 
    this.setState({
      hour: 0,
      minutes: 0,
      second: 0,
      intervals: [], 
      disabled: false
    });
  };

  interval = () => {
    const { hour, minutes, second, intervals } = this.state;
    const currentInterval = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    this.setState({ intervals: [...intervals, currentInterval] });
  };

  render() {
    return (
      <div className='app'>
        <div className="card">
          <div className="card-text">
            <h2>{this.state.hour.toString().padStart(2, '0')}:</h2>
            <h2>{this.state.minutes.toString().padStart(2, '0')}:</h2>
            <h2>{this.state.second.toString().padStart(2, '0')}</h2>
          </div>
          <div className="card-btns">
            <button className="btn-start" onClick={this.start} disabled={this.state.disabled}>
              <span className="text">Start</span>
            </button>
            <button className="btn-stop" onClick={this.stop}>
              <span className="text">Stop</span>
            </button>
            <button className="btn-clear" onClick={this.clear}>
              <span className="text">Clear</span>
            </button>
            <button className="btn-interval" onClick={this.interval}>
              <span className="text">Interval</span>
            </button>
          </div>
          {this.state.intervals.length > 0 && (
            <div className="intervals">
              {this.state.intervals.map((interval, index) => (
                <h2 key={index}>{interval}</h2>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
