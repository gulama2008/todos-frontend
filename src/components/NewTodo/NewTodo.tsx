import { useContext, useState } from "react";
import { Category, TodosContext } from "../../context/TodosContextProvider";
import { TodoService } from "../../services/todos-service";
import styles from "./NewTodo.module.scss"
import bin from "../../assets/delete.png";
import save from "../../assets/save.png";

const NewTodo = () => {
  const { categories, setShowNewTodo, changeTodos, setChangeTodos } =
    useContext(TodosContext);
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const handleCancel = () => {
    setShowNewTodo(false);
  };
  const handleAdd = () => {
    const data = {
      content: content,
      categoryId: category,
    };
    TodoService.createTodo(data)
      .then(() => setChangeTodos(changeTodos + 1))
      .catch((e) => console.log(e));
    setShowNewTodo(false);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={content}
        className={styles.input}
        placeholder="+ Add new task..."
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <select
        name=""
        id=""
        value={category}
        className={styles.select}
        onChange={(e) => {
          setCategory(parseInt(e.target.value));
        }}
      >
        <option value={0} className={styles.option}>
          Please select a category
        </option>
        {categories.map((category: Category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <div className={styles.icon_container}> 
        <img onClick={handleCancel} src={bin} className={styles.icon} />
        <img onClick={handleAdd} src={save} className={styles.icon} />
      </div>
    </div>
  );
};

export default NewTodo;
