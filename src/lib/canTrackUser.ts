import { acknowledge, acknowledged } from './cookie';
import isGdprCountry from './isGdprCountry';

interface Params {
  notice: () => Promise<void>;
  register: () => void;
}

export default async function canTrackUser({
  notice,
  register
}: Params): Promise<boolean> {
  if (acknowledged()) {
    register();
    return Promise.resolve(true);
  }
  if (await isGdprCountry()) {
    return Promise.resolve(false);
  }

  register();
  return notice()
    .then(acknowledge)
    .then(() => true);
}
