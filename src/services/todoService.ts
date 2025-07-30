import { sanitiseInput } from '../utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTodos() {
  const response = await fetch(`${API_BASE_URL}to-dos`);
  if (!response.ok) {
    throw new Error('Failed to fetch to dos');
  }

  return response.json();
}

export async function addTodo(title: string, description: string) {
  const sanitisedTitle = sanitiseInput(title);
  const sanitisedDescription = sanitiseInput(description);

  const response = await fetch(`${API_BASE_URL}to-dos/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: sanitisedTitle,
      description: sanitisedDescription,
    }),
  });

  if(!response.ok) {
    throw new Error('Failed to add to do');
  }

  return response.json();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_BASE_URL}to-dos/${id}`, {
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
  const sanitisedTitle = sanitiseInput(title);
  const sanitisedDescription = sanitiseInput(description);

  const response = await fetch(`${API_BASE_URL}to-dos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: sanitisedTitle,
      description: sanitisedDescription,
    }),
  });

  if(!response.ok) {
    throw new Error('Failed to update to do');
  }

  return response.json();
}
