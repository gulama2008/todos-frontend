import { useContext, useEffect, useState } from "react";
import {
  Category,
  Todo,
  TodosContext,
} from "../../context/TodosContextProvider";
import { TodoService } from "../../services/todos-service";
import styles from "./TodoItem.module.scss";
import copy from "../../assets/copy.png";
import bin from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import save from "../../assets/save.png";
export interface TodoProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoProps) => {
  const { categories, changeTodos, setChangeTodos } = useContext(TodosContext);
  const [todoContent, setTodoContent] = useState<string>("");
  const [todoCategoryId, setTodoCategoryId] = useState<number>(
    todo.category?.id
  );
  // const [todoCategoryName, setTodoCategoryName] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [toShowEdit, setToShowEdit] = useState<boolean>(true);
  useEffect(() => {
    setTodoContent(todo.content);
    if (todo.category) {
      setTodoCategoryId(todo.category.id);
    } else { 
      setTodoCategoryId(0);
    }

    // const todoCategoryName = categories.find(
    //   (category: Category) => category.id == todo.category.id
    // );
    // setTodoCategoryName(todoCategoryName);
  }, []);
  const handleContentChange = (e: any) => {
    setTodoContent(e.target.value);
  };
  const handleCategoryChange = (e: any) => {
    // if (e.target.value === 0) {
    //   setTodoCategoryId(null);
    // } else {
      setTodoCategoryId(e.target.value);
  };

  const handleDelete = () => {
    TodoService.deleteTodo(todo.id)
      .then(() => setChangeTodos(changeTodos - 1))
      .catch((e) => console.log(e));
  };

  const handleCheck = () => {
    if (toShowEdit) {
      const data = {
        content: todoContent,
        archived: false,
        completed: !isChecked,
        // categoryId: todoCategoryId ? todoCategoryId : null,
        categoryId: todoCategoryId
      };
      TodoService.updateTodo(todo.id, data)
        .then(() => {
          setChangeTodos(changeTodos + 1);
        })
        .catch((e) => console.log(e));
    }
    setIsChecked(!isChecked);
  };

  const handleSave = () => {
    const data = {
      content: todoContent,
      archived: false,
      completed: isChecked,
      // categoryId: todoCategoryId ? todoCategoryId : null,
      categoryId: todoCategoryId
    };

    TodoService.updateTodo(todo.id, data)
      .then(() => {
        setChangeTodos(changeTodos + 1);
        setToShowEdit(true);
      })
      .catch((e) => console.log(e));
  };

  const handleCopy = () => {
    const data = {
      content: todoContent,
      archived: false,
      completed: isChecked,
      categoryId: todoCategoryId,
    };
    TodoService.createTodo(data)
      .then(() => setChangeTodos(changeTodos + 1))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        {toShowEdit ? (
          <div>{todoContent}</div>
        ) : (
          <input value={todoContent} onChange={handleContentChange} />
        )}
      </div>
      <div className={styles.category_container}>
        {toShowEdit ? (
          <div>{todo.category ? todo.category.name : "Not categorised"}</div>
        ) : (
          <select onChange={handleCategoryChange} value={todoCategoryId}>
            {categories.map((category: Category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
            <option value={0}>Not categorised</option>
          </select>
        )}
      </div>

      <div className={styles.icon_container}>
        <img onClick={handleCopy} src={copy} className={styles.icon} />
        <img onClick={handleDelete} src={bin} className={styles.icon} />

        {toShowEdit ? (
          <img
            onClick={() => {
              setToShowEdit(false);
            }}
            src={edit}
            className={styles.icon}
          />
        ) : (
          <img onClick={handleSave} src={save} className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
