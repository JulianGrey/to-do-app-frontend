import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ToDo from './ToDo';

describe('ToDo component', () => {
  const findCancelButton = () => screen.queryByTestId('cancel-button');
  const findDeleteButton = () => screen.queryByTestId('delete-button');
  const findEditButton = () => screen.queryByTestId('edit-button');
  const findSaveButton = () => screen.queryByTestId('save-button');

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

  it('shows the edit and delete buttons by default', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    const deleteButton = findDeleteButton();
    const editButton = findEditButton();

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it('shows the save and cancel buttons in edit mode', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    let deleteButton = findDeleteButton();
    let editButton = findEditButton();

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const cancelButton = findCancelButton();
    const saveButton = findSaveButton();
    deleteButton = findDeleteButton();
    editButton = findEditButton();

    expect(deleteButton).toBeNull();
    expect(editButton).toBeNull();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('goes back to the default actions view', () => {
    render(<ToDo toDo={{ title: 'Test Title' }} />);
    let deleteButton = findDeleteButton();
    let editButton = findEditButton();

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    let cancelButton = findCancelButton();
    let saveButton = findSaveButton();
    deleteButton = findDeleteButton();
    editButton = findEditButton();

    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeNull();
    expect(editButton).toBeNull();
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    cancelButton = findCancelButton();
    deleteButton = findDeleteButton();
    editButton = findEditButton();
    saveButton = findSaveButton();

    expect(cancelButton).toBeNull();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(saveButton).toBeNull();
  });
});
