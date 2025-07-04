import { useEffect, useState } from 'react';
import './App.scss';
import { getToDos } from './services/toDoService';
import ToDo from './components/ToDo/ToDo';

function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [toDoList, setToDoList] = useState([]);

  async function handleToDoList() {
    setToDoList(await getToDos());
  }

  useEffect(() => {
    handleToDoList();
  }, []);

  return (
    <div className='to-do-app'>
      <header>
        <h1>{headerTitle}</h1>
      </header>
      <main>
        <div className='to-do-list'>
          {
            (
              <ul>
                <ToDo toDo={{ title: '' }} isNewToDo={true} />
                {toDoList.length > 0 && toDoList.map((toDo, index) => <ToDo toDo={toDo} key={index} />)}
              </ul>
            )
          }
          { !toDoList.length && (<p className='no-to-dos'>{defaultMessage}</p>) }
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
