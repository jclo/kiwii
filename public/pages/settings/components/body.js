/* eslint class-methods-use-this: 0 */

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
        <ul className={'table-view'}>
          <li className={'table-view-cell'}>
            Item 1
            <div className={'toggle'}>
              <div className={'toggle-handle'}></div>
            </div>
          </li>
          <li className={'table-view-cell'}>
            Item 2
            <div className={'toggle active'}>
              <div className={'toggle-handle'}></div>
            </div>
          </li>
          <li className={'table-view-cell'}>
            Item 3
            <div className={'toggle'}>
              <div className={'toggle-handle'}></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
