import { fetchAPI } from './fetchApi';
export async function signUp(body) {
  const { data, error } = await fetchAPI(
    '/api/v1/users/signup',
    {
      'Content-Type': 'Application/json',
    },
    'POST',
    JSON.stringify(body)
  );
  return { data, error };
}
export async function Login(body) {
  const { data, error } = await fetchAPI(
    '/api/v1/users/login',
    {
      'Content-Type': 'Application/json',
    },
    'POST',
    JSON.stringify(body)
  );
  return { data, error };
}
export async function Logout() {
  const { data, error } = await fetchAPI(
    '/api/v1/users/logout',
    {
      'Content-Type': 'application/json',
    },
    'DELETE'
  );
  return { data, error };
}
