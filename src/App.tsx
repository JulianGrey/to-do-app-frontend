import { useEffect, useState } from 'react';
import './App.scss';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './services/todoService';
import Todo, { type TodoProps } from './components/Todo/Todo';

function App() {
  const defaultMessage = 'You have no tasks.';
  const headerTitle = 'Your To-dos';
  const [todoList, setTodoList] = useState<TodoProps[]>([]);

  async function handleTodoList() {
    setTodoList(await getTodos());
  }

  async function handleAddTodo(title: string, description: string) {
    try {
      await addTodo(title, description);
      setTodoList(await getTodos());
    } catch (err) {
      console.error('Failed to add to do');
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      setTodoList(await getTodos());
    } catch (err) {
      console.error('Failed to delete to do');
    }
  }

  async function handleUpdateTodo(title: string, description: string, id: number) {
    try {
      await updateTodo(title, description, id);
      setTodoList(await getTodos());
    } catch (err) {
      console.error('Failed to delete to do');
    }
  }

  useEffect(() => {
    handleTodoList();
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
                <Todo
                  todo={{ title: '', description: '' }}
                  isNewTodo={true}
                  onAdd={handleAddTodo}
                />
                {todoList.length > 0 && todoList.map((todo, index) => (
                  <Todo
                    todo={todo}
                    key={index}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                  />
                ))}
              </ul>
            )
          }
          { !todoList.length && (<p className='no-to-dos'>{defaultMessage}</p>) }
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
