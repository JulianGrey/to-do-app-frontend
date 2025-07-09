import { useEffect, useState } from 'react';
import './ToDo.scss';

export interface ToDoProps {
  title: string,
  description: string,
}

interface ToDoComponentProps {
  toDo: ToDoProps;
  isNewToDo?: boolean
  onAdd?: (title: string, description: string) => void;
}

export default function ToDo({ toDo, isNewToDo = false, onAdd = () => {}}: ToDoComponentProps) {
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrentTitle(toDo.title);
    setCurrentDescription(toDo.description);
  }, [toDo.title, toDo.description]);

  function handleEditTtile(event: React.ChangeEvent<HTMLInputElement>) {
    setEditedTitle(event.target.value);
  }

  function handleIsEditing(value: boolean) {
    if (value) {
      setEditedDescription(currentDescription);
      setEditedTitle(currentTitle);
    }
    setIsEditing(() => value);
  }

  function handleSave() {
    setCurrentDescription(editedDescription);
    setCurrentTitle(editedTitle);
    handleIsEditing(false);
  }

  return (
    <li className='to-do'>
      <div className='to-do-header'>
        <div className='headline'>
          { isNewToDo || isEditing
            ? (
              <div className='edit-to-do-title edit-to-do'>
                <label htmlFor='edit-to-do-title'>Title:</label>
                <input
                  id='edit-to-do-title'
                  type='text'
                  maxLength={40}
                  onChange={handleEditTtile}
                  placeholder='40 character limit'
                  value={editedTitle} />
              </div>
            )
            : (<h2 className='to-do-title' data-testid='to-do-title'>{currentTitle}</h2>)
          }
        </div>
        <div className='actions'>
          {
            (!isEditing && !isNewToDo) && (
              <>
                <button
                  className='edit'
                  data-testid='edit-button'
                  onClick={() => handleIsEditing(true)}
                >Edit</button>
                <button
                  className='delete'
                  data-testid='delete-button'
                  onClick={() => {}}
                >Delete</button>
              </>
            )
          }
          {
            isEditing && (
              <>
                <button
                  className='save'
                  onClick={handleSave}
                  data-testid='save-button'
                >Save</button>
                <button
                  className='cancel'
                  onClick={() => handleIsEditing(false)}
                  data-testid='cancel-button'
                >Cancel</button>
              </>
            )
          }
          {
            isNewToDo && (
              <>
                <button
                  className='add'
                  onClick={() => onAdd(editedTitle, editedDescription)}
                  data-testid='add-button'
                >Add new to do</button>
              </>
            )
          }
        </div>
      </div>
      <div className='to-do-body'>
        { (isNewToDo || isEditing) &&
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
        {currentDescription && !(isNewToDo || isEditing) &&
          <p className='to-do-description' data-testid='to-do-description'>{currentDescription}</p>
        }
      </div>
    </li>
  );
}
