// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle } from 'components/atoms/TabsText';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';
/* eslint-disable max-len */
type Props = {
  ...SpotLightTabDataQuery,
  currency: string,
  pageData: PageUnit[]
}

const Health = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const healthPerformance = getPageLine('health-performance');
  const caseOfTb = getPageLine('case-of-tb');
  const healthCareFunding = getPageLine('health-care-funding');
  if (!props.healthTabRegional) throw new Error('regional health data is missing');
  const healthTabRegional = props.healthTabRegional;
  const fundingNCU = healthTabRegional.healthCareFunding &&
    healthTabRegional.healthCareFunding.value_ncu ?
    healthTabRegional.healthCareFunding.value_ncu : NoData;
  const fundingUSD = healthTabRegional.healthCareFunding &&
    healthTabRegional.healthCareFunding.value;
  const fundingValue = props.currency === 'US$' ? fundingUSD : fundingNCU;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {healthPerformance.title}
            {
              // $FlowFixMe
              TabsToolTip(healthTabRegional.districtPerformance && healthTabRegional.districtPerformance.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegional.districtPerformance && healthTabRegional.districtPerformance.value
              ? healthTabRegional.districtPerformance.value
              : NoData}
          </TabsP>
          <p>out of 100, and is ranked in</p>
          <TabsP>
            {healthTabRegional.districtHealthRank && healthTabRegional.districtHealthRank.value
              ? healthTabRegional.districtHealthRank.value
              : NoData}
          </TabsP>
          <p>place overall</p>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {caseOfTb.title}
            { // $FlowFixMe
              TabsToolTip(healthTabRegional.treatmeantOfTb && healthTabRegional.treatmeantOfTb.toolTip)
            }
          </HeaderTitle>
          <TabsP>
            {healthTabRegional.treatmeantOfTb && healthTabRegional.treatmeantOfTb.value
              // $FlowFixMe
              ? `${healthTabRegional.treatmeantOfTb.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle>
            {healthCareFunding.title}
            {healthTabRegional.healthCareFunding && healthTabRegional.healthCareFunding.toolTip
              ? <TabsToolTip {...healthTabRegional.healthCareFunding.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {fundingValue ? `${props.currency} ${fundingValue}` : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Health;
