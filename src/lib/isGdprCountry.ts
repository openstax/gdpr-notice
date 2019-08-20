// For documentation purposes, I'm using a dictionary
// Source: http://www.ip2country.net/ip2country/country_code.html
// Note: Azores and Madeira are Portugal, Canary Islands are Spain
// Channel Islands, Northern Ireland, England, Wales, and Scotland constitute the United Kingdom
const excludedCountries = {
  AT: 'Austria',
  BE: 'Belgium',
  BG: 'Bulgaria',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DK: 'Denmark',
  EE: 'Estonia',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  GB: 'United Kingdom',
  GF: 'French Guiana',
  GP: 'Guadeloupe',
  GR: 'Greece',
  HR: 'Croatia',
  HU: 'Hungary',
  IE: 'Ireland',
  IS: 'Iceland',
  IT: 'Italy',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  MF: 'Saint Martin',
  MQ: 'Martinique',
  MT: 'Malta',
  NL: 'Netherlands',
  NO: 'Norway',
  PL: 'Poland',
  PT: 'Portugal',
  RE: 'Reunion',
  RO: 'Romania',
  SE: 'Sweden',
  SI: 'Slovenia',
  SK: 'Slovakia',
  YT: 'Mayotte'
};

export default function checkCountry(): Promise<boolean> {
  return fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(response => response.countryCode in excludedCountries);
}
