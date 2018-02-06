// @flow
import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Element } from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  'marginTop': '1em',
  '& h4': {
    marginBottom: '.5em !important',
  },
});

interface Props  {
  children?: Element<any>;
  title: string;
}

const bubbleWrapper = ({ title, children }: Props) =>
  (<Wrapper>
    <Header as="h4">
      {title}
    </Header>
    {children}
  </Wrapper>);

export default bubbleWrapper;