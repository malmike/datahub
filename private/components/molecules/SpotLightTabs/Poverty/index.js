// @flow
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {TabsP, HeaderTitle} from 'components/atoms/TabsText';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  ...SpotLightTabDataQuery,
  pageData: PageUnit[]
}

const Poverty = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const povertyLevels = getPageLine('poverty-levels');
  const lifeExpectancy = getPageLine('life-expectancy');
  const stdOfLiving = getPageLine('std-of-living');
  if (!props.povertyTabRegional) throw new Error('regional poverty data is missing');
  const povertyTabRegional = props.povertyTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {povertyLevels.title}
            {povertyTabRegional.poorestPeople && povertyTabRegional.poorestPeople.toolTip
              ? <TabsToolTip {...povertyTabRegional.poorestPeople.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.poorestPeople && povertyTabRegional.poorestPeople.value
              ? `${povertyTabRegional.poorestPeople.value} %`
              : NoData}
          </TabsP>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {lifeExpectancy.title}
            {povertyTabRegional.lifeExpectancy && povertyTabRegional.lifeExpectancy.toolTip
              ? <TabsToolTip {...povertyTabRegional.lifeExpectancy.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.lifeExpectancy && povertyTabRegional.lifeExpectancy.value
              ? povertyTabRegional.lifeExpectancy.value
              : NoData}
          </TabsP>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <HeaderTitle >
            {stdOfLiving.title}
            {povertyTabRegional.stdOfLiving && povertyTabRegional.stdOfLiving.toolTip
              ? <TabsToolTip {...povertyTabRegional.stdOfLiving.toolTip} />
              : ''}
          </HeaderTitle>
          <TabsP>
            {povertyTabRegional.stdOfLiving && povertyTabRegional.stdOfLiving.value
              ? povertyTabRegional.stdOfLiving.value
              : NoData}
          </TabsP>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Poverty;
