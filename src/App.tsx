import { useEffect, useState } from 'react';
import './App.scss';
import { addToDo, getToDos } from './services/toDoService';
import ToDo, { type ToDoProps } from './components/ToDo/ToDo';

function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [toDoList, setToDoList] = useState<ToDoProps[]>([]);

  async function handleToDoList() {
    setToDoList(await getToDos());
  }

  async function handleAddTodo(title: string, description: string) {
    try {
      await addToDo(title, description);

      setToDoList(await getToDos());
    } catch (error) {
      console.error('Failed to add to do', error);
    }
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
                <ToDo toDo={{ title: '', description: '' }} isNewToDo={true} onAdd={handleAddTodo} />
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
