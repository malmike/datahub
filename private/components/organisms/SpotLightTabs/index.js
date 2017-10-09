// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import {
  Education,
  Health,
  Overview,
  Population,
  Poverty,
} from 'components/molecules/SpotLightTabs';
import Tabs from 'components/molecules/Tabs';
import {errorHandler} from 'lib/utils';
import Pane from 'components/atoms/Pane';
import LoadingPlaceholder from 'components/molecules/LoadingPlaceholder';
import {getDistrictProfileData} from 'components/organisms/PagesData';
import populationConfig from 'visboxConfigs/spotlightPopulationTabCharts';
import overviewConfig from 'visboxConfigs/spotlightOverviewTabCharts';
import TABS_QUERY from './query.graphql';

type WrapperProps = {
  loading: boolean,
  currency: string,
  variables: { id: string},
  ...SpotLightTabDataQuery,
};

const spotlightTabs = (props: WrapperProps) => {
  if (
    props.loading ||
    !props.overviewTabRegional ||
    !props.populationTabRegional ||
    !props.educationTabRegional ||
    !props.healthTabRegional
  ) {
    return <LoadingPlaceholder loading={props.loading} />;
  }
  const pageData = getDistrictProfileData(props.variables.id, 'uganda');
  return (
    <Tabs selected={0} height="20em">
      <Pane label="Overview" id="spotlight-overview">
        <Overview
          {...props}
          pageData={pageData}
          currency={props.currency}
          config={overviewConfig}
        />
      </Pane>
      <Pane label="Poverty" id="spotlight-poverty">
        <Poverty {...props} pageData={pageData} />
      </Pane>
      <Pane label="Population" id="spotlight-population">
        <Population {...props} pageData={pageData} config={populationConfig} />
      </Pane>
      <Pane label="Education" id="spotlight-education">
        <Education {...props} pageData={pageData} currency={props.currency} />
      </Pane>
      <Pane label="Health" id="spotlight-health">
        <Health {...props} pageData={pageData} currency={props.currency} />
      </Pane>
    </Tabs>
  );
};

const withData = graphql(TABS_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country,
    },
  }),
  props: ({ data }) => {
    const { error } = data;
    if (error) errorHandler(error);
    return data;
  },
});

export default withData(spotlightTabs);
