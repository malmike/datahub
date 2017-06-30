// @flow
import React from 'react';
import {Container, Grid, Header, Icon, Table} from 'semantic-ui-react';
import type { Element } from 'react';
import glamorous from 'glamorous';
import {
  DataRevolution,
  ForwardLooking,
  GovernmentFinance,
  HumanitarianFinance,
  InternationalFinance,
  InternationalOfficial,
  Poverty,
  Vulnerability,
} from 'components/molecules/GlobalTabs';
import NavigationBarTabs from 'components/molecules/NavigationBarTabs';
import Pane from 'components/atoms/Pane';
import RankingsTable from 'components/molecules/RankingsTable';
import {HeaderGroup} from 'components/atoms/Header';
import data from './data';
import Generic from '../Generic';
import Search from '../../molecules/Search';
import Slider from '../../molecules/YearSlider';
import ChartShare from '../../molecules/ChartShare';

const HeaderContainer = glamorous.div({
  paddingTop: '2em',
  paddingBottom: '2em',
  fontSize: '1.2rem',
});
export default () => {
  return (
    <Generic pathName="/">
      <Search />
      <Container>
        <HeaderContainer>
          <Grid centered>
            <Grid.Column width={8} textAlign="center">
              <b><Icon name="pie graph" />The Development Data Hub </b> is the most comprehensive source for financial
              resource flow data alongside poverty, social and vulnerability indicators.
              Read more about the data hub.
            </Grid.Column>
          </Grid>
        </HeaderContainer>
      </Container>
      <NavigationBarTabs selected={0} >
        <Pane label="Poverty">
          <Poverty options={data.tabOptions.poverty} />
        </Pane>
        <Pane label="Vulnerability">
          <Vulnerability options={data.tabOptions.vulnerability} />
        </Pane>
        <Pane label="Government Finance">
          <GovernmentFinance options={data.tabOptions.governmentFinance} />
        </Pane>
        <Pane label="International Finance">
          <InternationalFinance options={data.tabOptions.internationalFinance} />
        </Pane>
        <Pane label="International Official Finance">
          <InternationalOfficial options={data.tabOptions.internationalOfficial} />
        </Pane>
        <Pane label="Humanitarian Finance">
          <HumanitarianFinance options={data.tabOptions.humanitarianFinance} />
        </Pane>
        <Pane label="Data Revolution">
          <DataRevolution options={data.tabOptions.dataRevolution} />
        </Pane>
        <Pane label="Forward Looking ODA">
          <ForwardLooking options={data.tabOptions.forwardLooking} />
        </Pane>
      </NavigationBarTabs>
      <Container>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={4} textAlign="center">
              <Slider minimum={2000} maximum={2020} position={2017} step={1} onChange={d => {}} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <HeaderGroup>
                <Header as="h3">2013</Header>
                <Header as="h5">(This indicator has data for a single year only.)</Header>
              </HeaderGroup>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={5} textAlign="center">
              <ChartShare size="big" color="black" />
            </Grid.Column>
          </Grid.Row>
          <RankingsTable data={data.countryRankings} />
        </Grid>
      </Container>
    </Generic>
  );
};
