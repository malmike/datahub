import React from 'react';
import withApolloAndReduxProvider from 'lib/storybook-addon/apolloAndRedux';
import { storiesOf } from '@storybook/react';
import Spotlight from '.';

storiesOf('Templates', module)
  .addDecorator(withApolloAndReduxProvider())
  .add('Spot Light Uganda', () => <Spotlight state={{}} id="uganda" />)
  .add('Spot Light Kenya', () => <Spotlight state={{}} id="kenya" />);
