import * as React from 'react';
import { Div, Img} from 'glamorous';
import { Container } from 'semantic-ui-react';
import { red, white } from '../../theme/semantic';
import { SectionHeader } from '../../atoms/Header';
import { DarkBg } from '../../atoms/Container';
import ProfileDataSourceTable from '../../molecules/ProfileDataSourceTable';
import CountryProfileTopTabs from '../../organisms/CountryProfileTabs';
import ProfileHeader from '../../molecules/ProfileHeader';
import {getCountry} from '../../../utils';
import { GOVERNMENT_FINANCE_LOWER } from '../../../utils/constants';
import {StateToShare} from '../../molecules/ChartShare';
import dynamic, {DynamicOptions} from 'next/dynamic';
import methodologyData from '../../MethodologyData/country-profile';
import {Country} from '../../types';
import Router from 'next/router';
import Link from 'next/link';
import Generic from '../Generic';

// TODO: the dynamic types are a pain to work with, need to get improved submit PR
const dynamicOpts: DynamicOptions<any, any> = {
  ssr: true,
  loading: () => <p>Loading...</p>,
    modules: () => ({
        CountryProfileLowerTabs: import('../../organisms/CountryProfileLowerTabs') as Promise<any>
      }),
    render: (props, {CountryProfileLowerTabs}) =>
        <CountryProfileLowerTabs {...props} />
};

const DynamicCountryProfileLowerTabs = dynamic(dynamicOpts as any) as any;

interface Props  {
  id: string;
  rehydrated?: boolean;
  state?: StateToShare;
}

export default class Profile extends React.Component<Props> {
  public static init(props) {
    const country = getCountry(props.id);
    const selectedTab = props.state && props.state.chartId &&
      props.state.chartId !== GOVERNMENT_FINANCE_LOWER ? 1 : 0;
    return {selectedTab, country};
  }
  public state: {
    selectedTab: number,
    country: Country
  };
  public lowerTabs: HTMLElement;
  constructor(props: Props) {
    super(props);
    this.state = Profile.init(props);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState(Profile.init(nextProps));
  }

  public jumpToSection = (sectionId: string) => {
    const selectedTab = sectionId === GOVERNMENT_FINANCE_LOWER ? 0 : 1;
    this.setState({selectedTab});
    if (this.lowerTabs) this.lowerTabs.scrollIntoView();
  }
  public setLowerTabs = (node) => {
    this.lowerTabs = node;
  }
  public render() {
    return (
      <Generic>
      {process.env.NODE_ENV !== 'test' ?
        <ProfileHeader
          entity={this.state.country}
          router={Router}
          nextLink={Link}
          jumpToSection={this.jumpToSection}
        /> : ''
        }
        <CountryProfileTopTabs id={this.props.id} />
        <Div paddingTop={'4em'} paddingBottom={'4em'}>
          <Container textAlign="center">
            <SectionHeader innerRef={this.setLowerTabs}>
              <Img
                width="32px"
                verticalAlign="middle"
                src={`/flags/svg/${this.state.country.id}.svg`}
              /> EXPLORE <span>DOMESTIC AND INTERNATIONAL RESOURCES</span>
            </SectionHeader>
          </Container>
        </Div>
        {process.env.NODE_ENV !== 'test' ?
          <DynamicCountryProfileLowerTabs
            id={this.props.id}
            selectedTab={this.state.selectedTab}
            {...this.props.state}
          /> : ''}
        <DarkBg>
          <SectionHeader color={red} fontColor={white}>
          MORE FROM DI ON {this.state.country.name && this.state.country.name.toUpperCase()}
          </SectionHeader>
        </DarkBg>
        <ProfileDataSourceTable data={methodologyData.methodology} />
      </Generic>);
  }
}
