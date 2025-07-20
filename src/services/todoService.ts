const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTodos() {
  const response = await fetch(`${API_BASE_URL}to-do`);
  if (!response.ok) {
    throw new Error('Failed to fetch to dos');
  }

  return response.json();
}

export async function addTodo(title: string, description: string) {
  const response = await fetch(`${API_BASE_URL}to-do/add`, {
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

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_BASE_URL}to-do/${id}`, {
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

export async function updateTodo(title: string, description: string, id: number) {
  const response = await fetch(`${API_BASE_URL}to-do/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });

  if(!response.ok) {
    throw new Error('Failed to update to do');
  }

  return response.json();
}
