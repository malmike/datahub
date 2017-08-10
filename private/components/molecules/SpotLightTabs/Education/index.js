// @flow
import { Container, Header, Grid } from 'semantic-ui-react';
import React from 'react';
import { P } from 'glamorous';
import { big } from 'components/theme';
import { red } from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { NoData } from 'lib/utils/constants';

const Educaton = (props: SpotLightTabDataQuery) => {
  if (!props.educationTabRegional) throw new Error('regional education data is missing');
  const educationTabRegional = props.educationTabRegional;
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {educationTabRegional.pupilTeacherRatioGovtSchl &&
            educationTabRegional.pupilTeacherRatioGovtSchl.value
              ? educationTabRegional.pupilTeacherRatioGovtSchl.value
              : NoData}
          </P>
          <p>
            in government schools and
            {educationTabRegional.pupilTeacherRatioGovtSchl &&
            educationTabRegional.pupilTeacherRatioGovtSchl.toolTip
              ? <TabsToolTip {...educationTabRegional.pupilTeacherRatioGovtSchl.toolTip} />
              : ''}
          </p>
          <P fontSize={big} fontWeight={'bold'}>
            {educationTabRegional.pupilTeacherRatioOtherSchl &&
            educationTabRegional.pupilTeacherRatioOtherSchl.value
              ? educationTabRegional.pupilTeacherRatioOtherSchl.value
              : NoData}
          </P>
          <p>
            in all schools
            {educationTabRegional.pupilTeacherRatioOtherSchl &&
            educationTabRegional.pupilTeacherRatioOtherSchl.toolTip
              ? <TabsToolTip {...educationTabRegional.pupilTeacherRatioOtherSchl.toolTip} />
              : ''}
          </p>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
            {educationTabRegional.educationTabRegional &&
            educationTabRegional.studentsPassRate.toolTip
              ? <TabsToolTip {...educationTabRegional.studentsPassRate.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {educationTabRegional.studentsPassRate && educationTabRegional.studentsPassRate.value
              ? educationTabRegional.studentsPassRate.value
              : NoData}
          </P>
          <p>and is ranked in</p>
          <P fontSize={big} fontWeight={'bold'}>
            {educationTabRegional.studentsPassDistrictRank &&
            educationTabRegional.studentsPassDistrictRank.value
              ? educationTabRegional.studentsPassDistrictRank.value
              : NoData}
          </P>
          <P>place overall</P>
        </Grid.Column>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header textAlign="center" as="h3">
            HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
            {educationTabRegional.primaryEducationfunding &&
            educationTabRegional.primaryEducationfunding.toolTip
              ? <TabsToolTip {...educationTabRegional.primaryEducationfunding.toolTip} />
              : ''}
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>
            {educationTabRegional.primaryEducationfunding &&
            educationTabRegional.primaryEducationfunding.value
              ? educationTabRegional.primaryEducationfunding.value
              : NoData}
          </P>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Educaton;
