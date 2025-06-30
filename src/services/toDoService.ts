const API_BASE_URL = 'http://localhost:3000/api/todos';

export async function getToDos() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch to dos');
  }

  return response.json();
}
