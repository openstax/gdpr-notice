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
    document.cookie = `${key}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }
};

const ACKNOWLEDGEMENT_KEY = 'cookie_notice_acknowledged';

export function acknowledged(): boolean {
  return !!cookie.hash[ACKNOWLEDGEMENT_KEY];
}

export function acknowledge(): void {
  cookie.setKey(ACKNOWLEDGEMENT_KEY);
}
