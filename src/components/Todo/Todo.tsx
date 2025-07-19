import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Todo.scss';
import Modal from '../Modal/Modal';

export interface TodoProps {
  title: string,
  description: string,
  id?: number,
}

interface TodoComponentProps {
  todo: TodoProps;
  isNewTodo?: boolean;
  onAdd?: (title: string, description: string) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (title: string, description: string, id: number) => void;
}

export default function Todo({
  todo,
  isNewTodo = false,
  onAdd = () => {},
  onDelete = () => {},
  onUpdate = () => {},
}: TodoComponentProps) {
  const maximumTitleLength = 40;
  const titlePlaceholder = `Maximum ${maximumTitleLength} characters`;
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentTitle(todo.title);
    setCurrentDescription(todo.description);
  }, [todo.title, todo.description]);

  function handleEditTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setEditedTitle(event.target.value);
  }

  async function handleAdd() {
    if (editedTitle) {
      await onAdd(editedTitle, editedDescription);
      setEditedTitle('');
      setEditedDescription('');
    }
  }

  async function handleDelete() {
    if (todo.id !== undefined) {
      await onDelete(todo.id);
      setShowModal(false);
    }
  }

  function handleShowModal(value: boolean) {
    setShowModal(value);
  }

  function handleIsEditing(value: boolean) {
    if (value) {
      setEditedDescription(currentDescription);
      setEditedTitle(currentTitle);
    }
    setIsEditing(() => value);
  }

  async function handleUpdate() {
    if (todo.id !== undefined) {
      await onUpdate(editedTitle, editedDescription, todo.id);
      handleIsEditing(false);
    }
  }

  return (
    <>
      <li className='to-do blue-container'>
        <div className='to-do-header'>
          <div className='headline'>
            { isNewTodo || isEditing
              ? (
                <div className='edit-to-do-title edit-to-do'>
                  <label htmlFor='edit-to-do-title'>Title (required):</label>
                  <input
                    id='edit-to-do-title'
                    type='text'
                    maxLength={maximumTitleLength}
                    onChange={handleEditTitle}
                    placeholder={titlePlaceholder}
                    value={editedTitle}
                  />
                </div>
              ) : (
                <h2 className='to-do-title' data-testid='to-do-title'>{currentTitle}</h2>
              )
            }
          </div>
        </div>
        <div className='to-do-body'>
          { (isNewTodo || isEditing) &&
            (
              <div className='edit-to-do-description edit-to-do'>
                <label htmlFor='edit-to-do-description'>Description:</label>
                <textarea
                  id='edit-to-do-description'
                  rows={3}
                  onChange={(event) => setEditedDescription(event.target.value)}
                  value={editedDescription}
                ></textarea>
              </div>
            )
          }
          {currentDescription && !(isNewTodo || isEditing) &&
            <p className='to-do-description' data-testid='to-do-description'>{currentDescription}</p>
          }
        </div>
        <div className='actions'>
          {
            (!isEditing && !isNewTodo) && (
              <>
                <button
                  className='edit'
                  data-testid='edit-button'
                  onClick={() => handleIsEditing(true)}
                >Edit</button>
                <button
                  className='delete'
                  onClick={() => handleShowModal(true)}
                  data-testid='delete-button'
                >Delete</button>
              </>
            )
          }
          {
            isEditing && (
              <>
                <button
                  className='update'
                  onClick={handleUpdate}
                  data-testid='update-button'
                  disabled={!editedTitle.length}
                >Update</button>
                <button
                  className='cancel'
                  onClick={() => handleIsEditing(false)}
                  data-testid='cancel-button'
                >Cancel</button>
              </>
            )
          }
          {
            isNewTodo && (
              <>
                <button
                  className='add'
                  onClick={handleAdd}
                  data-testid='add-button'
                  disabled={!editedTitle.length}
                >Add new to do</button>
              </>
            )
          }
        </div>
      </li>
      {showModal && createPortal(
        <Modal onCancel={() => setShowModal(false)} onConfirm={handleDelete}>
          <p>Are you sure you want to delete "{todo.title}"?</p>
        </Modal>,
        document.getElementById('to-do-app') as HTMLElement,
      )}
    </>
  );
}
