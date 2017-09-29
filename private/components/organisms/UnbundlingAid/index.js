// @flow
import React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import {Div} from 'glamorous';
import { graphql } from 'react-apollo';
import TotalODA from 'components/molecules/UnbundlingAidTotalODA';
import UnbundlingTreemap from 'components/molecules/UnbundlingTreemap';
import UnbundlingAidTour from 'components/atoms/UnbundlingAidTour';
import TourContainer from 'components/molecules/TourContainer';
import QUERY from './query.graphql';
import dataODA from './data-oda';
import dataOOF from './data-oof';

type Props = {
  aidType: string,
  tourVisible: boolean,
};

const toDropDownOptions = list => [
  { name: 'All', value: '', key: 'all', active: true },

  ...list.map(({ id, name }) => ({ name, value: id, key: id })),
];

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      args: {
        aidType: props.aidType,
        year: props.startYear,
        groupBy: 'to_di_id',
      },
    },
  }),

  props: ({ ownProps, data }: { ownProps: Object, data: Object }) => {
    const { error, loading } = data;

    if (error) throw new Error(error);
    const { channels = [], bundles = [], to = [], from = [], sectors = [], years = [] } =
      ownProps.aidType === 'oda' ? dataODA.selections : dataOOF.selections;

    const safeBundles = data.bundles && data.bundles.length ? data.bundles : [];
    const bundleSum = safeBundles.reduce((sum, datum) => sum + datum.value, 0);
    return {
      loading,

      selections: {
        years: years.map(year => ({
          name: year,
          value: year,
          active: year === ownProps.startYear,
        })),

        to: toDropDownOptions(to),

        from: toDropDownOptions(from),

        sectors: toDropDownOptions(sectors),

        forms: toDropDownOptions(bundles),

        channels: toDropDownOptions(channels),
      },

      bundles: safeBundles,

      bundleSum,

      refetch: data.refetch,
    };
  },
});

// eslint-disable-next-line flowtype-errors/show-errors
const WithData = withData(UnbundlingTreemap);

const buttonStyle = {
  position: 'absolute',
  right: '1em',
  top: '1.2em',
};
// TODO: supply year oda and oof totals via a pull API
// TODO: supply selection options via pull API

class Chart extends React.Component {
  // eslint-disable-next-line react/sort-comp
  state: {
    compare: boolean,
    showTreemap: boolean
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      compare: false,
      showTreemap: props.tourVisible,
      showTour: props.tourVisible,
    };
  }
  componentWillReceiveProps(props: Props) {
    console.log(props.showTreemap);
    this.setState({
      showTreemap: this.state.showTreemap || props.tourVisible,
      showTour: props.tourVisible,
    });
  }
  showTreemapHandler() {
    this.setState({showTreemap: true});
  }
  toggleCompare() {
    this.setState({ compare: !this.state.compare });
  }
  closeTour() {
    this.setState({
      showTour: false,
    });
  }

  render() {
    /* eslint-disable no-nested-ternary */
    return (
      <Div position="relative">
        {
          !this.state.showTreemap ?
            <TotalODA
              onClickHandler={() => this.showTreemapHandler()}
              yearTotal={this.props.aidType === 'oda' ? dataODA.yearTotal : dataOOF.yearTotal}
              aidType={this.props.aidType}
            /> :
            !this.state.compare
              ? <WithData {...this.props} />
              : <Grid style={{ margin: 0 }}>
                <Grid.Row style={{ padding: 0 }}>
                  <Grid.Column width={8} style={{ padding: 0 }}>
                    <WithData compact {...this.props} />
                  </Grid.Column>
                  <Grid.Column width={8} style={{ padding: 0}}>
                    <WithData compact {...this.props} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        }
        <Button style={buttonStyle} onClick={() => this.toggleCompare()}>
          {this.state.compare
            ? <span>
                Close <Icon name="close" />
            </span>
            : <span>
                Compare <Icon name="plus" />
            </span>}
        </Button>
        <TourContainer
          visible={this.state.showTour}
          closeHandler={() => this.closeTour()}
        >
          <UnbundlingAidTour aidType={this.props.aidType === 'oda' ? 'ODA' : 'OOFs'} />
        </TourContainer>
      </Div>
    );
  }
}

export default Chart;
