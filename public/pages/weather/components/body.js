/* global */
/* eslint max-len: [1, 110] */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default React.createClass({

  render() {
    const options = this.props.options;
    const background = {
      backgroundImage: `url(${options.url})`,
      backgroundColor: 'transparent',
      backgroundRepeat: 'no-repeat no-repeat',
      backgroundSize: 'cover',
    };

    return (
      <div className={'weather'} style={background}>
        <div className={'condition'} style={{ color: options.color }}>
          <div className={'icon'}><i className={`wi ${options.icon}`}></i></div>
          <div className={'text'}>{options.description}</div>
        </div>
        <div className={'temperature'} style={{ color: options.color }}>{options.temperature}</div>
        <div className={'measures'} style={{ color: options.color }}>
          <span className={'humidity'}><i className={'wi wi-humidity'}></i>{options.humidity}</span>
          <span className={'pressure'}><i className={'wi wi-barometer'}></i>{options.pressure}</span>
          <span className={'wind'}><i className={'wi wi-strong-wind'}></i>{options.wind}</span>
        </div>
      </div>
    );
  },
});
