import { createContext, useEffect, useState } from "react";
import todosList from "../data/todos.json";
import categoryList from "../data/categories.json";
import { TodoService } from "../services/todos-service";
import { CategoryService } from "../services/categories-service";
export const TodosContext = createContext<any>(null);
export interface Todo {
  id: number;
  content: string;
  archived: boolean;
  completed: boolean;
  category: Category;
}
export interface Category {
  id: number;
  name: string;
}
const TodosContextProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [completedNum, setCompletedNum] = useState<number>(0);
  const [incompletedNum, setIncompletedNum] = useState<number>(0);
  const [showNewTodo, setShowNewTodo] = useState<boolean>(false);
  const [changeTodos, setChangeTodos] = useState<number>(0);
  const [changeCategories, setChangeCategories] = useState<number>(0);
  const [activeSideBarItem, setActiveSideBarItem] = useState<number>(-1);
  useEffect(() => {
    TodoService.get()
      .then((res) => {
        const todosNotArchived=res.filter(todo=>todo.archived==false)
        setTodos(todosNotArchived);
      })
      .catch((e) => console.log(e));
  }, [changeTodos,changeCategories]);
  useEffect(() => {
    CategoryService.get()
      .then((res) => {
        setCategories(res);
      })
      .catch((e) => console.log(e));
  }, [changeCategories]);
  useEffect(() => {
    const completedNum = todos.reduce((a: number, b: Todo) => {
      if (b.completed) {
        return ++a;
      }
      return a;
    }, 0);
    setCompletedNum(completedNum);
    setIncompletedNum(todos.length - completedNum);
  }, [todos]);
console.log(todos);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        categories,
        setCategories,
        completedNum,
        incompletedNum,
        showNewTodo,
        setShowNewTodo,
        changeTodos,
        setChangeTodos,
        changeCategories,
        setChangeCategories,
        activeSideBarItem,
        setActiveSideBarItem,
        
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
