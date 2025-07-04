import { useEffect, useState } from 'react';
import './App.scss';
import { getToDos } from './services/toDoService';
import ToDo, { type ToDoProps } from './components/ToDo/ToDo';

function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [toDoList, setToDoList] = useState<ToDoProps[]>([]);

  async function handleToDoList() {
    setToDoList(await getToDos());
  }

  async function handleAddTodo(description: string, title: string) {
    const newToDoList = [...toDoList];
    const newToDo = { description, title };

    newToDoList.push(newToDo);
    setToDoList(newToDoList);
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
                <ToDo toDo={{ description: '', title: '' }} isNewToDo={true} onAdd={handleAddTodo} />
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
