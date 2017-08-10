// @flow
export const GLOBAL_INDICATOR = 'GLOBAL_INDICATOR';
export const SPOTLIGHT_INDICATOR = 'SPOTLIGHT_INDICATOR';
export const LOADING_STATUS = 'LOADING_STATUS';

type ActionBase = {
  type: string,
};
export type GlobalIndicator = ActionBase & {
  globalIndicator: string,
};
export type SpotLightlIndicator = ActionBase & {
  spotlightIndicator: string,
};
export type LoadingStatus = ActionBase & {
  loading: boolean,
};

export const changeLoadingStatus = (loading: boolean): Dispatch<LoadingStatus> => ({
  type: LOADING_STATUS,
  loading,
});

export const changeGlobalIndicator = (globalIndicator: string): Dispatch<GlobalIndicator> => ({
  type: GLOBAL_INDICATOR,
  globalIndicator,
});

export const changeSpotlightIndicator = (
  spotlightIndicator: string,
): Dispatch<SpotLightlIndicator> => ({ type: SPOTLIGHT_INDICATOR, spotlightIndicator });
