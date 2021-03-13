export function getCookie(name) {
  const cookies = document.cookie;
  if (cookies.includes(name)) {
    const jwt = cookies
      .split(';')
      .find((cookie) => cookie.includes(`${name}=`))
      .split(`${name}=`)[1];
    return jwt;
  }
  return false;
}
