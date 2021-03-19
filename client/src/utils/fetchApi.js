export async function fetchAPI(
  url,
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body
) {
  try {
    let error;
    let res = await fetch(url, {
      method,
      headers,
      body,
    });
    res = await res.json();
    if (res.statusCode) {
      error = res.message;
    }
    return { data: res.data, error };
  } catch (error) {
    return { data: null, error };
  }
}
