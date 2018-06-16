/* eslint class-methods-use-this: 0 */

// -- Vendor modules
import React from 'react';

// -- Project Modules

// -- Variables

// -- Main section
export default class extends React.Component {
  render() {
    return (
      <div className={'sidemenu'}>
        <h3>Features</h3>
        <ul className={'table-view'}>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#home'}>
              <span className={'media-object pull-left fa fa-home'}></span>
              <div className={'media-body'}>
                Home
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#search'}>
              <span className={'media-object pull-left fa fa-search'}></span>
              <div className={'media-body'}>
                Search
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#profile'}>
              <span className={'media-object pull-left fa fa-user'}></span>
              <div className={'media-body'}>
                Profile
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#favorite'}>
              <span className={'media-object pull-left fa fa-star'}></span>
              <div className={'media-body'}>
                Favorite
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#settings'}>
              <span className={'media-object pull-left fa fa-gear'}></span>
              <div className={'media-body'}>
                Settings
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#geoloc'}>
              <span className={'media-object pull-left fa fa-location-arrow'}></span>
              <div className={'media-body'}>
                Geoloc
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#weather'}>
              <span className={'media-object pull-left wi wi-day-sunny'}></span>
              <div className={'media-body'}>
                Weather
              </div>
            </a>
          </li>
          <li className={'table-view-cell media'}>
            <a className={'navigate-right'} href={'#legal'}>
              <span className={'media-object pull-left fa fa-info'}></span>
              <div className={'media-body'}>
                Legal
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
