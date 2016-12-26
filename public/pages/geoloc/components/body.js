// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default React.createClass({
  render() {
    return (
      <div>
        <h1>{this.props.options.title}</h1>
        <p>
          {this.props.options.text}
        </p>
      </div>
    );
  },
});
