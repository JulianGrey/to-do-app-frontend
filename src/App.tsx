import { useState } from 'react';
import './App.scss';
import { ToDo } from './components/ToDo/ToDo';



function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [toDoList, setToDoList] = useState([
    {
      category: 'Event',
      description: 'To Do Description',
      title: 'To Do Title',
    },
    {
      title: 'To Do Title 2',
    },
    {
      description: 'To Do Description 3',
      title: 'To Do Title 3',
    },
  ]);

  return (
    <div className='to-do-app'>
      <header>
        <h1>{headerTitle}</h1>
      </header>
      <main>
        <div className='to-do-list'>
          {
            toDoList.length > 0 && (
              <ul>
                {toDoList.map((toDo, index) => <ToDo toDo={toDo} key={index} />)}
              </ul>
            )
          }
          {
            !toDoList.length && (<p>{defaultMessage}</p>)
          }
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
