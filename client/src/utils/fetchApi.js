export async function fetchAPI(url, method = 'GET', headers, body) {
  try {
    let error;
    let res = await fetch(url, {
      mode: 'cors',
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
    return { error };
  }
}
