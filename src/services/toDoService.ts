const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getToDos() {
  const response = await fetch(`${API_BASE_URL}todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch to dos');
  }

  return response.json();
}

export async function addToDo(title: string, description: string) {
  const response = await fetch(`${API_BASE_URL}todos/add`, {
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

export async function deleteToDo(id: number) {
  const response = await fetch(`${API_BASE_URL}todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if(!response.ok) {
    throw new Error('Failed to delete to do');
  }

  return response.json();
}
