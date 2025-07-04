import { useState } from 'react';
import './ToDo.scss';

interface ToDoProps {
  description?: string,
  title: string,
}

interface ToDoComponentProps {
  toDo: ToDoProps;
  isNewToDo?: boolean
}

export default function ToDo({ toDo, isNewToDo = false}: ToDoComponentProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleIsEditing(value: boolean) {
    setIsEditing(() => value);
  }

  return (
    <li className='to-do'>
      <div className='to-do-header'>
        <div className='headline'>
          { isNewToDo || isEditing
            ? (
              <div className='edit-to-do-title edit-to-do'>
                <label htmlFor='edit-to-do-title'>Title:</label>
                <input id='edit-to-do-title' type='text' maxLength={40} placeholder='40 character limit'/>
              </div>
            )
            : (<h2 className='to-do-title' data-testid='to-do-title'>{toDo.title}</h2>)
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
                  onClick={() => {}}
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
                  onClick={() => {}}
                  data-testid='add-button'
                >Add</button>
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
              <textarea id='edit-to-do-description' rows={3}></textarea>
            </div>
          )
        }
        {toDo.description && !(isNewToDo || isEditing) &&
          <p className='to-do-description' data-testid='to-do-description'>{toDo.description}</p>
        }
      </div>
    </li>
  );
}
