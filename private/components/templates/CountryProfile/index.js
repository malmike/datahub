// @flow
import React, {Component} from 'react';
import { Div, Span, H4, Img} from 'glamorous';
import { Container, Grid, Icon, Button } from 'semantic-ui-react';
import { red, white } from 'components/theme/semantic';
import { SectionHeader, Lead } from 'components/atoms/Header';
import { BodyLink } from 'components/atoms/Link';
import { DarkBg } from 'components/atoms/Backgrounds';
import ProfileDataSourceTable from 'components/molecules/ProfileDataSourceTable';
import CountrySearch from 'components/organisms/CountrySearchInput';
import CountryProfileTopTabs from 'components/organisms/CountryProfileTabs';
import { CardContainer, ProfileHeader } from 'components/atoms/Container';
import {getCountry} from 'lib/utils';
import { connect } from 'react-redux';
import {RECIPIENT, GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS} from 'lib/utils/constants';
import type {StateToShare} from 'components/molecules/ChartShare';
import type { State } from 'lib/reducers';
import dynamic from 'next/dynamic';
import Generic from '../Generic';
import data from './data';
/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable no-useless-constructor */

const DynamicMapComponent = dynamic(
  import('components/molecules/SmallMap'), {
    ssr: false,
    loading: () => (<p>Loading...</p>)
  });
const DynamicCountryProfileLowerTabs = dynamic(
  import('components/organisms/CountryProfileLowerTabs'), { ssr: false });

type Props = {
  id: string,
  rehydrated: boolean,
  state: StateToShare,
};
class Profile extends Component {
  constructor(props: Props) {
    super(props);
    this.country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId && props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;
    this.state = {selectedTab};
  }
  state: {
    selectedTab: number,
  }
  country: Country
  countryId: string
  countryName: string
  lowerTabs: HTMLElement
  jumpToSection = (sectionId: string) => {
    const selectedTab = sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1;
    this.setState({selectedTab});
    if (this.lowerTabs) this.lowerTabs.scrollIntoView();
  }
  render() {
    return (<Generic>
      <ProfileHeader>
        <DynamicMapComponent slug={this.props.id} />
        <Div width="100%" position="absolute" top="0">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <CardContainer>
                    <H4 color={red}>
                      <Icon name="globe" color={'red'} />General Picture
                    </H4>
                    <CountrySearch visible placeholder={this.props.id} profile />
                    <Lead>
                      {this.country.countryType === RECIPIENT ?
                        `Explore this in-depth profile of ${this.country.name} to find out overall levels of poverty,
                        income distribution, division of wealth and more. Discover how national and
                        sub-national revenue is generated.` :
                        `Explore this in-depth profile of ${this.country.name} to see the international resources it directs to developing countries.
                        Get an overview of government spending, population and income distribution.`
                      }
                      <Img marginLeft="10px" width="32px" src={`/flags/svg/${this.country.id}.svg`} />
                      {this.country.slug === 'uganda' ?
                        <Span fontSize="0.7em" display={'inline-block'} fontWeight={500} >
                          Visit our new <BodyLink href="/spotlight-on-uganda">
                            Spotlight on Uganda</BodyLink> to explore data by district.</Span> : ''
                      }
                    </Lead>
                    <Span>
                      Jump to {
                        this.country.countryType === RECIPIENT ?
                          <span>
                            <BodyLink
                              onClick={() => this.jumpToSection(GOVERNMENT_FINANCE_LOWER)}
                              color={red}
                            >governement finance </BodyLink> or </span> : ''
                      }
                      <BodyLink
                        color={red}
                        onClick={() => this.jumpToSection(INFLOWS_VS_OUTFLOWS)}
                      >International resources</BodyLink>
                    </Span>
                    <Div marginTop={'1.5em'}>
                      <Button icon="facebook f" />
                      <Button icon="twitter" />
                      <Button icon="google plus" />
                      <Button icon="mail outline" />
                      <Button size="medium"><Span fontWeight={500}>Download and Print</Span></Button>
                    </Div>
                  </CardContainer>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Div>
      </ProfileHeader>
      <CountryProfileTopTabs id={this.props.id} />
      <Div paddingTop={'4em'} paddingBottom={'4em'}>
        <Container textAlign="center">
          <SectionHeader innerRef={node => { this.lowerTabs = node; }}>
            <Img
              width="32px"
              verticalAlign="middle"
              src={`/flags/svg/${this.country.id}.svg`}
            /> EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
          </SectionHeader>
        </Container>
      </Div>
      <DynamicCountryProfileLowerTabs
        id={this.props.id}
        selectedTab={this.state.selectedTab}
        {...this.props.state}
      />
      <DarkBg>
        <SectionHeader color={red} fontColor={white}>
          MORE FROM DI ON {this.country.name && this.country.name.toUpperCase()}
        </SectionHeader>
      </DarkBg>
      <ProfileDataSourceTable data={data.dataSources} />
    </Generic>);
  }
}

const mapStateToProps = ({ app: { rehydrated } }: State) => ({ rehydrated });
const ProfileWithRedux = connect(mapStateToProps)(Profile);

export default ProfileWithRedux;
