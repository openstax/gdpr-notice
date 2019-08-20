import isGdprCountry from './isGdprCountry';

interface StringHash {
  [key: string]: string;
}

const cookie = {
  get hash(): StringHash {
    return decodeURIComponent(document.cookie)
      .split('; ')
      .reduce<StringHash>((a, b) => {
        const [key, val] = b.split('=');
        a[key] = val;
        return a;
      }, {});
  },
  setKey(key: string): void {
    document.cookie = `${key}=true; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
  }
};

const ACKNOWLEDGEMENT_KEY = 'cookie_notice_acknowledged';
function acknowledged(): boolean {
  return !!cookie.hash[ACKNOWLEDGEMENT_KEY];
}

function acknowledge(): void {
  cookie.setKey(ACKNOWLEDGEMENT_KEY);
}

interface Params {
  notice: () => Promise<void>;
  register: () => void;
}

export async function acknowledgeGdprNotice({
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
