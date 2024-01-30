import { useContext, useState } from "react";
import styles from "./SideBarItem.module.scss";
import { Category, TodosContext } from "../../context/TodosContextProvider";
import { CategoryService } from "../../services/categories-service";
import delete1 from "../../assets/delete1.png";
export interface SideBarItemProps {
  category?: Category;
  title: string;
  index?: number;
  number: number;
}

const SideBarItem = ({ category, title, number, index }: SideBarItemProps) => {
  const {
    activeSideBarItem,
    setActiveSideBarItem,
    changeCategories,
    setChangeCategories,
  } = useContext(TodosContext);
  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(title);
  const handleClick = () => {
    setActiveSideBarItem(index);
  };

  let containerClasses = styles.container;
  if (activeSideBarItem === index) {
    containerClasses += ` ${styles.active}`;
  }
  const handleDelete = () => {
    CategoryService.deleteCategory(category!.id)
      .then(() => {
        setActiveSideBarItem(-1);
        setChangeCategories(changeCategories - 1);
      })
      .catch((e) => console.log(e));
  };

  const handleDoubleClick = () => {
    setEditCategory(true);
  };

  const handleOnBlur = () => {
    const data = {
      name:categoryName
    }
    CategoryService.updateCategory(category?.id!, data)
      .then(() => {
        setEditCategory(false);
        setChangeCategories(changeCategories + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      {editCategory ? (
        <input
          type="text"
          value={categoryName}
          onChange={handleChangeCategoryName}
          onBlur={handleOnBlur}
          className={styles.title}
        />
      ) : (
        <div className={styles.title} onDoubleClick={handleDoubleClick}>
          {title}
        </div>
      )}

      <div className={styles.number}>{number}</div>
      {category && (
        <img src={delete1} onClick={handleDelete} className={styles.delete} />
      )}
    </div>
  );
};

export default SideBarItem;
