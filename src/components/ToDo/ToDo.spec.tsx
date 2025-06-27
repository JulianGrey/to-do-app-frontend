import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import ToDo from './ToDo';

describe('ToDo component', () => {
  it('renders the provided title', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    const title = screen.getByTestId('to-do-title');

    expect(title.textContent).toBe('Test Title');
  });

  it('renders the description if provided', () => {
    render(<ToDo toDo={{ title: 'Test Title', description: 'Test Description' }} />);
    const description = screen.getByTestId('to-do-description');

    expect(description.textContent).toBe('Test Description');
  });

  it('does not render the description if not provided', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    const description = screen.queryByTestId('to-do-description');

    expect(description).toBeNull();
  });

  it('renders the category if provided', () => {
    render(<ToDo toDo={{ title: 'Test Title', category: 'Test Category' }} />);
    const category = screen.getByTestId('to-do-category');

    expect(category.textContent).toBe('(Test Category)');
  });

  it('does not render the category if not provided', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    const category = screen.queryByTestId('to-do-category');

    expect(category).toBeNull();
  });
});
