import React from 'react';
import PropTypes from 'prop-types';

import './styles/index.css';

export interface ButtonProps {
  appName: string;
}

export default class App extends React.Component<ButtonProps> {
  state = {
    name: 'React'
  }

  static propTypes = {
    appName: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    console.log(e);
  }

  render() {
    const { appName } = this.props;
    return (
      <div onClick={this.handleClick}>
        I am {this.state.name} {appName}
      </div>
    )
  }
}
