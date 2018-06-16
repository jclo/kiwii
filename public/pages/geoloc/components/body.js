/* eslint */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.options.title}</h1>
        <p>
          {this.props.options.text}
        </p>
      </div>
    );
  }
}
