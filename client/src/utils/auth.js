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
