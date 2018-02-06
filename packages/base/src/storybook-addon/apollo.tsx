/**
 * simple apollo Provider for querying a live graphql API
 * TODO: add ability to mock data from schema
 */
import * as React from 'react';
import { ApolloProvider} from 'react-apollo';
// import { config } from 'package.json';
import {create} from '../apollo';

export const client = create({});

const withApolloProvider = () => {
  return storyFn => {
    return (
      <ApolloProvider client={client}>
        {storyFn()}
      </ApolloProvider>
    );
  };
};
export default withApolloProvider;