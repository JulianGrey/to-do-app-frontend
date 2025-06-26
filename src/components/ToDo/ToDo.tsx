import './ToDo.scss';

interface ToDoProps {
  category?: string,
  description?: string,
  title: string,
}

export function ToDo({ toDo }: { toDo: ToDoProps }) {
  return (
    <li className='to-do'>
      <div className='to-do-headline'>
        <h2 className='to-do-title'>{toDo.title}</h2>
        {toDo.category && <h3 className='to-do-category'>({toDo.category})</h3>}
      </div>
      {toDo.description && <p className='to-do-description'>{toDo.description}</p>}
    </li>
  );
}
