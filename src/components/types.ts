import {GlamorousComponent} from 'glamorous';
// Feels like a hack, but its basically including ambient types from datahub-api
import '@devinit/datahub-api';

export type GlamorousComponentT = GlamorousComponent<any, any>;

export interface IProcess {
    browser: boolean;
    env: any & { // add by webpack
      PORT?: number,
      NODE_ENV?: string;
    };
  }

export interface PageUnit {
    id: string;
    title: string;
    narrative?: string;
    donor_title?: string;
}

export interface PageData {
    spotlightDistrict: PageUnit[];
    countryProfile: PageUnit[];
}

export interface ReplaceFieldsArgs {
    pageData: PageUnit[];
    toReplace: string;
    replacement: string;
}

export interface District {
    id: string;
    name: string;
    slug?: string;
}

export type Country = District & {
    has_domestic_data?: string,
    countryType: string,
    slug: string;
    hasPDF?: boolean
};

export interface NavIndicator {
    id: string;
    name: string;
    heading?: string;
    tooltip?: string;
    source?: string;
}

export interface NavBarItem {
    id: string;
    name: string;
    indicators: NavIndicator[];
    default_indicator?: string;
}

export interface SelectOption {
    id: string;
    name: string;
    text: string;
}
