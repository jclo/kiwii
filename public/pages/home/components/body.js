/* global */
/* eslint class-methods-use-this: 0, max-len: [2, 120] */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default class extends React.Component {
  render() {
    return (
      <div className={'home'}>
        <p className={'head'}>
          Thanks for downloading
          <br />
          Kiwii.
        </p>
        <p className={'slogan'}>
          This is an example of a very basic application with a vertical responsive menu and a few empty pages.
        </p>
        <hr />
        <p className={'howto'}>
          Click on the top left icon to open the menu.
        </p>
      </div>
    );
  }
}
