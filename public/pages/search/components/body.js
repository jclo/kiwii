/* eslint class-methods-use-this: 0 */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default class extends React.Component {
  render() {
    return (
      <form className={'content-padded'}>
        <input type={'text'} placeholder={'Full name'} />
        <input type={'search'} placeholder={'Search'} />
        <textarea rows={'5'}></textarea>
        <button className={'btn btn-positive btn-block'}>Choose existing</button>
      </form>
    );
  }
}
