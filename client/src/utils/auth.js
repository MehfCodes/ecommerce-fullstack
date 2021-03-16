import { fetchAPI } from './fetchApi';
export async function signUp(body) {
  const { data, error } = await fetchAPI(
    '/api/v1/users/signup',
    'POST',
    {
      'Content-Type': 'Application/json',
    },
    JSON.stringify(body)
  );
  return { data, error };
}
export async function Login(body) {
  const { data, error } = await fetchAPI(
    '/api/v1/users/login',
    'POST',
    {
      'Content-Type': 'Application/json',
    },
    JSON.stringify(body)
  );
  return { data, error };
}
export async function Logout() {
  const { data, error } = await fetchAPI('/api/v1/users/logout', 'DELETE', {
    'Content-Type': 'application/json',
  });
  return { data, error };
}
