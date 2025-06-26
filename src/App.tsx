import { useState } from 'react';
import './App.scss';

function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [toDoList, setToDoList] = useState([]);

  return (
    <div className='to-do-app'>
      <header>
        <h1>{headerTitle}</h1>
      </header>
      <main>
        <div>
          {
            toDoList.length > 0 && (
              <ul>
                {toDoList.map((toDo, index) => <li key={index}>{toDo}</li>)}
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
