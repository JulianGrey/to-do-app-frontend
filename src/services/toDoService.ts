const API_BASE_URL = 'http://localhost:3000/api/todos';

export async function getToDos() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch to dos');
  }

  return response.json();
}

export async function addToDo(title: string, description: string) {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });

  if(!response.ok) {
    throw new Error('Failed to add to do');
  }

  return response.json();
}
