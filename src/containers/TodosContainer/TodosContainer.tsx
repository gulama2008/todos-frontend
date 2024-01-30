import { useContext, useEffect, useState } from "react";
import styles from "./TodosContainer.module.scss";
import { Todo, TodosContext } from "../../context/TodosContextProvider";
import TodoItem from "../../components/Todo/TodoItem";
import NewTodo from "../../components/NewTodo/NewTodo";
const TodosContainer = () => {
  const {
    todos,
    showNewTodo,
    setShowNewTodo,
    activeSideBarItem,
  } = useContext(TodosContext);

  const [displayTodos, setDisplayTodos] = useState<Todo[]>(todos);
  
  
  useEffect(() => {
    console.log(activeSideBarItem);

    if (activeSideBarItem > 0) {
      const newDisplayTodos = todos.filter((todo: Todo) => {
        return todo.category?.id == activeSideBarItem;
      });
      console.log(newDisplayTodos);
      
      setDisplayTodos(newDisplayTodos);
    } else if (activeSideBarItem === -1) {
      setDisplayTodos(todos);
    } else if (activeSideBarItem === -2) {
      const newDisplayTodos = todos.filter((todo: Todo) => {
        return todo.completed === false;
      });
      setDisplayTodos(newDisplayTodos);
    } else if (activeSideBarItem===-4) { 
      const newDisplayTodos = todos.filter((todo: Todo) => {
        return todo.category ==null;
      });
      setDisplayTodos(newDisplayTodos);
    }else {
      const newDisplayTodos = todos.filter((todo: Todo) => {
        return todo.completed === true;
      });
      setDisplayTodos(newDisplayTodos);
    }
  }, [todos, activeSideBarItem]);
  const handleAddNew = () => {
    setShowNewTodo(true);
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.title}>My TODO List</div>

        <button onClick={handleAddNew} className={styles.add}>
          Add New
        </button>
        {showNewTodo && <NewTodo />}
        {displayTodos.map((todo: Todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
};

export default TodosContainer;
