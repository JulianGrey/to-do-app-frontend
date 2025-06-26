import { useState } from 'react';
import './ToDo.scss';

interface ToDoProps {
  category?: string,
  description?: string,
  title: string,
}

export function ToDo({ toDo }: { toDo: ToDoProps }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleIsEditing(value: boolean) {
    setIsEditing(() => value);
  }

  return (
    <li className='to-do'>
      <div className='to-do-header'>
        <div className='headline'>
          <h2 className='to-do-title'>{toDo.title}</h2>
          {toDo.category && <h3 className='to-do-category'>({toDo.category})</h3>}
        </div>
        <div className='actions'>
          {
            !isEditing && (
              <>
                <button
                  className='edit'
                  onClick={() => handleIsEditing(true)}
                >Edit</button>
                <button
                  className='delete'
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
                >Save</button>
                <button
                  className='cancel'
                  onClick={() => handleIsEditing(false)}
                >Cancel</button>
              </>
            )
          }
        </div>
      </div>
      {toDo.description && <p className='to-do-description'>{toDo.description}</p>}
    </li>
  );
}
