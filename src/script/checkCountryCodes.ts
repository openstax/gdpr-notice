import { difference, isEqual, uniq } from 'lodash/fp';
import fetch from 'node-fetch';
import gdprCountries from '../lib/gdprCountries';

// IPs selected from https://lite.ip2location.com/ip-address-ranges-by-country
const ips = [
  {
    code: 'AT',
    country: 'Austria',
    ip: '2.56.208.10'
  },
  {
    code: 'BE',
    country: 'Belgium',
    ip: '2.18.160.10'
  },
  {
    code: 'BG',
    country: 'Bulgaria',
    ip: '5.182.20.10'
  },
  {
    code: 'HR',
    country: 'Croatia',
    ip: '34.99.142.10'
  },
  {
    code: 'CY',
    country: 'Cyprus',
    ip: '31.216.64.10'
  },
  {
    code: 'CZ',
    country: 'Czech Republic',
    ip: '5.1.56.10'
  },
  {
    code: 'DK',
    country: 'Denmark',
    ip: '2.109.75.10'
  },
  {
    code: 'EE',
    country: 'Estonia',
    ip: '5.45.112.10'
  },
  {
    code: 'FI',
    country: 'Finland',
    ip: '2.58.88.10'
  },
  {
    code: 'FR',
    country: 'France',
    ip: '2.17.108.10'
  },
  {
    code: 'GB',
    country: 'United Kingdom',
    ip: '2.120.0.10'
  },
  {
    code: 'GF',
    country: 'French Guiana',
    ip: '45.169.164.10'
  },
  {
    code: 'DE',
    country: 'Germany',
    ip: '5.199.176.0'
  },
  {
    code: 'GR',
    country: 'Greece',
    ip: '5.144.192.10'
  },
  {
    code: 'GP',
    country: 'Guadeloupe',
    ip: '46.238.128.10'
  },
  {
    code: 'HU',
    country: 'Hungary',
    ip: '5.38.128.10'
  },
  {
    code: 'IS',
    country: 'Iceland',
    ip: '37.152.64.10'
  },
  {
    code: 'IE',
    country: 'Ireland',
    ip: '5.62.88.10'
  },
  {
    code: 'IT',
    country: 'Italy',
    ip: '2.17.124.0'
  },
  {
    code: 'LV',
    country: 'Latvia',
    ip: '37.148.168.10'
  },
  {
    code: 'LI',
    country: 'Liechtenstein',
    ip: '57.79.176.10'
  },
  {
    code: 'LT',
    country: 'Lithuania',
    ip: '37.156.216.0'
  },
  {
    code: 'IT',
    country: 'Italy',
    ip: '2.17.124.10'
  },
  {
    code: 'LU',
    country: 'Luxembourg',
    ip: '2.56.104.10'
  },
  {
    code: 'MT',
    country: 'Malta',
    ip: '37.75.32.10'
  },
  {
    code: 'MQ',
    country: 'Martinique',
    ip: '41.77.244.10'
  },
  {
    code: 'YT',
    country: 'Mayotte',
    ip: '41.242.116.10'
  },
  {
    code: 'NL',
    country: 'Netherlands',
    ip: '2.59.88.10'
  },
  {
    code: 'NO',
    country: 'Norway',
    ip: '2.148.0.10'
  },
  {
    code: 'PL',
    country: 'Poland',
    ip: '2.59.128.10'
  },
  {
    code: 'PT',
    country: 'Portugal',
    ip: '17.77.44.10'
  },
  {
    code: 'RE',
    country: 'Reunion',
    ip: '80.8.22.10'
  },
  {
    code: 'RO',
    country: 'Romania',
    ip: '5.2.128.10'
  },
  {
    code: 'MF',
    country: 'Saint Martin',
    ip: '38.87.230.10'
  },
  {
    code: 'SK',
    country: 'Slovakia',
    ip: '31.170.64.10'
  },
  {
    code: 'SI',
    country: 'Slovenia',
    ip: '31.7.192.10'
  },
  {
    code: 'ES',
    country: 'Spain',
    ip: '5.2.88.10'
  },
  {
    code: 'SE',
    country: 'Sweden',
    ip: '5.154.244.10'
  }
];

// tslint:disable:no-console
const testCountries = uniq(ips.map(obj => obj.code));
gdprCountries.sort();
testCountries.sort();

const untestedCountries = difference(gdprCountries, testCountries);
const extraTestedCountries = difference(testCountries, gdprCountries);

if (untestedCountries.length > 0) {
  console.error('some gdprCountries are untested: ', untestedCountries);
  process.exit();
}

if (extraTestedCountries.length > 0) {
  console.error(
    'some test countries are not in the gdprCountries list: ',
    extraTestedCountries
  );
  process.exit();
}

if (!isEqual(testCountries, gdprCountries)) {
  console.error("test countries don't match gdprCountries");
  process.exit();
}

function checkEntry(): void {
  const obj = ips.shift();

  if (!obj) {
    return;
  }

  const testUrl = 'http://ip-api.com/json/' + obj.ip;
  console.info('Check', obj.country, 'with', testUrl);
  fetch(testUrl)
    .then((response: any) => response.json())
    .then(({ countryCode }: { countryCode: string }) => {
      if (countryCode === obj.code) {
        console.info('...ok');
      } else {
        console.warn('expected', obj.code, ', got', countryCode);
      }
    })
    .then(() => {
      if (ips.length > 0) {
        // Slow it down a little
        setTimeout(checkEntry, 1500);
      }
    });
}
checkEntry();
