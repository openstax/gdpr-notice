import gdprCountries from './gdprCountries';

export default function isGdprCountry(): Promise<boolean> {
  return fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(response => gdprCountries.includes(response.countryCode));
}
