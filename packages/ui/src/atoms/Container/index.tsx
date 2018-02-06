import glamorous from 'glamorous';
import { lightGrey, seaBackground, white } from '../../theme/semantic';

export const Container = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: seaBackground,
});

export const GreyContainer = glamorous.div({
  width: '100%',
  flexDirection: 'row',
  backgroundColor: lightGrey,
});

export const RankingsTableContainer = glamorous.div({
  'paddingLeft': '2em',
  'paddingRight': '2em',
  '& a': {
    cursor: 'pointer'
  },
  '& td': {
    padding: '0.5em 0.75em !important',
  },
  'marginBottom': '2em'
});
export const PrintContainer = glamorous.div({
  'display': 'none',
  '@media print': {
    display: 'block !important',
  },
});
export const CardContainer = glamorous.div({
  background: 'rgba(255,255,255,.6)',
  boxShadow: '0 1px 4px rgba(0,0,0,.1)',
  padding: '1.5em',
  marginBottom: '0em',
  height: '480px',
});
export const ProfileHeader = glamorous.div({
  'height': '420px', // TODO -- use media queries
  'overflow': 'hidden',
  'borderBottom': `1px solid ${lightGrey}`,
  'background': white,
  'position': 'relative',
  ' & .ui.grid': {
    height: 0,
  },
  '& .ui.container': {
    height: 0,
  },
});
// TODO use media queries
export const MapPlaceholder = glamorous(GreyContainer)({ height: '600px' });