// For documentation purposes, I'm using a dictionary
// Source: http://www.ip2country.net/ip2country/country_code.html
// Note: Azores and Madeira are Portugal, Canary Islands are Spain
// Channel Islands, Northern Ireland, England, Wales, and Scotland constitute the United Kingdom

// prettier-ignore
const excludedCountries = [
  /* Austria */ 'AT',
  /* Belgium */ 'BE',
  /* Bulgaria */ 'BG',
  /* Croatia */ 'HR',
  /* Cyprus */ 'CY',
  /* Czech Republic */ 'CZ',
  /* Denmark */ 'DK',
  /* Estonia */ 'EE',
  /* Finland */ 'FI',
  /* France */ 'FR',
  /* French Guiana */ 'GF',
  /* Germany */ 'DE',
  /* Greece */ 'GR',
  /* Guadeloupe */ 'GP',
  /* Hungary */ 'HU',
  /* Iceland */ 'IS',
  /* Ireland */ 'IE',
  /* Italy */ 'IT',
  /* Latvia */ 'LV',
  /* Liechtenstein */ 'LI',
  /* Lithuania */ 'LT',
  /* Luxembourg */ 'LU',
  /* Malta */ 'MT',
  /* Martinique */ 'MQ',
  /* Mayotte */ 'YT',
  /* Netherlands */ 'NL',
  /* Norway */ 'NO',
  /* Poland */ 'PL',
  /* Portugal */ 'PT',
  /* Reunion */ 'RE',
  /* Romania */ 'RO',
  /* Saint Martin */ 'MF',
  /* Slovakia */ 'SK',
  /* Slovenia */ 'SI',
  /* Spain */ 'ES',
  /* Sweden */ 'SE',
  /* United Kingdom */ 'GB',
];

export default function isGdprCountry(): Promise<boolean> {
  return fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(response => excludedCountries.includes(response.countryCode));
}
