// @flow
import * as React from 'react';
import {Element} from 'react';
import { Div } from 'glamorous';
import { Icon, Popup } from 'semantic-ui-react';

interface Props  {
  children: any;
  color?: string;
  trigger: Element<any>;
}

interface State  {
  isOpen: boolean;
}

class ToolTip extends React.Component {
  public state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  public handleOpen = () => {
    this.setState({ isOpen: true });
  }

  public handleClose = () => {
    this.setState({ isOpen: false });
  }

  public render() {
    return (
      <Popup
        trigger={this.props.trigger}
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="top right"
      >
        <Popup.Header>
          <Div textAlign="right">
            <Icon name="close" onClick={this.handleClose} color={this.props.color || 'black'} />
          </Div>
        </Popup.Header>
        <Popup.Content>
          {this.props.children}
        </Popup.Content>
      </Popup>
    );
  }
}

export default ToolTip;