/* eslint no-unused-vars: 0, class-methods-use-this: 0  */

// -- Vendor modules
import React from 'react';

// -- Project Modules
import Header from './header';
import Menu from './menu';
import Content from './body';
import Footer from './footer';

// -- Variables

// -- Private function

// Sets or Updates the content section of the App.
function Body(props) {
  return <props.content options={props.options} />;
}

// -- Main section
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add the Title here!',
      menu: '',
      body: Content,
      options: null,
    };
  }

  setTitle(title) {
    this.setState({
      title,
    });
  }

  setContent(content, options) {
    this.setState({
      body: content,
      options,
    });
  }

  openMenu() {
    this.setState({
      menu: 'right',
    });
  }

  closeMenu() {
    this.setState({
      menu: '',
    });
  }

  render() {
    return (
      <div>
        {/* Movable Header section of App */}
        <Header title={this.state.title} menu={this.state.menu} />
        {/* Side Menu section of App */}
        <Menu />
        {/* Movable Content section of App */}
        <div className={`content ${this.state.menu}`}>
          {/* Content section */}
          <Body content={this.state.body} options={this.state.options} />
        </div>
        {/* Movable Footer section of App */}
        <Footer menu={this.state.menu} />
      </div>
    );
  }
}
