// @flow
import fetch from 'isomorphic-fetch';
import countriesData from 'components/organisms/CountrySearchInput/data';
import ugDistrictData from 'components/organisms/CountrySearchInput/ug-data';
import {RECIPIENT} from './constants';

export const getCountryName = (slug: string): string => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (country && country.name) return country.name;
  return slug;
};

export const getCountry = (slug: string): Country => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (!country) return {name: slug, countryType: RECIPIENT, slug, id: 'N/A'};
  return country;
};

export const getDistrictName = (slug: string, country: string): string => {
  // TODO: handle spotlight kenya
  if (country !== 'uganda') throw new Error('we are only dealing with spotlight uganda for now');
  const district = ugDistrictData.districts.find(district => district.slug === slug);
  if (district && district.name) return district.name;
  return slug;
};

export const printDiv = (divId: string) => {
  const divElem = document.getElementById(divId);
  const printContents = divElem && divElem.innerHTML ? divElem.innerHTML : 'Inavlid div id';
  const originalContents = document.body && document.body.innerHTML ? document.body.innerHTML : '';
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = printContents;
  }
  window.print();
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = originalContents;
  }
};

export const getShortURL = async (longUrl: string): Promise<string> => {
  // TODO: add access token to sever env virables
  const apiToken = '43c76f9ad7b4a259615aba8f682b55493477e467';
  const apiUrl = `https://api-ssl.bitly.com/v3/shorten?access_token=${apiToken}`;
  const response = await fetch(`${apiUrl}&longUrl=${longUrl}`);
  const json = await response.json();
  return json.data.url;
};
// country is global or uganda or kenya etc
export type Route = {
  routeAsPath: string,
  routePath: string
}
export const countryOrDistrictLink = (country: string, slug: string): Route => {
  let routePath: string;
  let routeAsPath: string;
  if (country === 'global') {
    routePath = `/country?id=${slug}`;
    routeAsPath = `/country/${slug}`;
  } else {
    routePath = `/spotlight_on_${country}?id=${slug}`;
    routeAsPath = `/spotlight_on_${country}/${slug}`;
  }
  return {routePath, routeAsPath};
};

const removeTrailingZero = (value: string): string => {
  const val = Number(value);
  return Math.round(val) === val ? val.toString() : value;
};

export const approximate =
  (value: number | string | null,
    precision: number = 1,
    shouldrRemoveTrailingZero: boolean = false): string => {
    if (value === undefined || value === null) return 'No data';
    const val = Number(value);
    const absValue = Math.abs(val);
    if (absValue < 1e3) {
      const fixed = val.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}` : fixed;
    } else if (absValue >= 1e3 && absValue < 1e6) {
      const newValue = val / 1e3;
      const fixed = newValue.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}k` : `${fixed}k`;
    } else if (absValue >= 1e6 && absValue < 1e9) {
      const newValue = val / 1e6;
      const fixed = newValue.toFixed(precision);
      return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}m` : `${fixed}m`;
    }
    const newValue = val / 1e9;
    const fixed = newValue.toFixed(precision);
    return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}bn` : `${fixed}bn`;
  };
