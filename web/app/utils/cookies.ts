export const getCookie = (name: string): string | null => {
  const token = useCookie<string | null>(name);
  return token.value;
};
export const setCookie = (name: string, value: string): void => {
  const token = useCookie<string | null>(name);
  token.value = value;
};
export const removeCookie = (name: string): void => {
  const token = useCookie<string | null>(name);
  token.value = null;
};
