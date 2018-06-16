/* eslint */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default class extends React.Component {
  render() {
    return (
      <header className={`bar bar-nav ${this.props.menu}`}>
        <a className={'pull-left icon fa fa-bars'} href={'#menu'}></a>
        <h1 className={'title'}>{this.props.title}</h1>
      </header>
    );
  }
}
