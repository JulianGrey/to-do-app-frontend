import { useEffect, useState } from 'react';
import './App.scss';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './services/todoService';
import Todo, { type TodoProps } from './components/Todo/Todo';
import Spinner from './components/Spinner/Spinner';

function App() {
  const defaultMessage = 'You have no tasks.';
  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleTodoList() {
    setIsLoading(true);

    try {
      setTodoList(await getTodos());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTodo(title: string, description: string) {
    setIsLoading(true);

    try {
      await addTodo(title, description);
      setTodoList(await getTodos());
    } catch {
      console.error('Failed to add to do');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteTodo(id: number) {
    setIsLoading(true);

    try {
      await deleteTodo(id);
      setTodoList(await getTodos());
    } catch {
      console.error('Failed to delete to do');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateTodo(title: string, description: string, id: number) {
    setIsLoading(true);

    try {
      await updateTodo(title, description, id);
      setTodoList(await getTodos());
    } catch {
      console.error('Failed to update to do');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleTodoList();
  }, []);

  return (
    <div id='to-do-app'>
      <Spinner visible={isLoading} />
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
    </div>
  );
}

export default App;
