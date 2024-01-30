import { useContext, useEffect, useRef, useState } from "react";
import styles from "./SideBarContainer.module.scss";
import {
  Category,
  Todo,
  TodosContext,
} from "../../context/TodosContextProvider";
import SideBarItem from "../../components/SideBarItem/SideBarItem";
import { CategoryService } from "../../services/categories-service";
import add from "../../assets/cross.png";
const SideBarContainer = () => {
  const {
    categories,
    todos,
    incompletedNum,
    completedNum,
    changeCategories,
    setChangeCategories,
  } = useContext(TodosContext);
  const [cateNums, setCateNums] = useState<number[]>([]);
  const [noCateNum, setNoCateNum] = useState<number>(0);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const cateNums = categories.map((category: Category) => {
      const num = todos.reduce((a: number, b: Todo) => {
        if (b.category && b.category.id === category.id) {
          return ++a;
        }
        return a;
      }, 0);
      return num;
    });
    const noCateNum = todos.reduce((a: number, b: Todo) => {
      if (!b.category) {
        return ++a;
      }
      return a;
    }, 0);
    setCateNums(cateNums);
    setNoCateNum(noCateNum);
  }, [todos, categories,changeCategories]);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [showAddCategory]);

  const handleChange = (e: any) => {
    setCategoryName(e.target.value);
  };

  const handleClickAddBtn = () => {
    setShowAddCategory(true);
  };

  const handleAddNewCategory = () => {
    if (categoryName == "") {
      setShowAddCategory(false);
    } else {
      const data = {
        name: categoryName,
      };
      CategoryService.createCategory(data)
        .then(() => {
          setChangeCategories(changeCategories + 1);
          setCategoryName("");
          setShowAddCategory(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleAddNewCategory();
    } else if (e.keyCode === 27) {
      setCategoryName("");
      setShowAddCategory(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.category_container}>
        <div className={styles.title}>
          <div>Categories</div>

          <div onClick={handleClickAddBtn} className={styles.add_container}>
            <img src={add} alt="" className={styles.add} />
          </div>
          {/* <div className={styles.add}>+</div> */}
        </div>

        {showAddCategory && (
          <input
            ref={ref}
            type="text"
            onBlur={handleAddNewCategory}
            onChange={handleChange}
            onKeyDown={handleEnterKeyPress}
            value={categoryName}
            className={styles.input}
          />
        )}
        <div className={styles.content}>
          <SideBarItem title="All" number={todos.length} index={-1} />
          {categories.map((category: Category, index: number) => {
            return (
              <SideBarItem
                category={category}
                title={category.name}
                index={category.id}
                number={cateNums[index]}
                key={category.id}
              />
            );
          })}
          <SideBarItem title="Not categorised" number={noCateNum} index={-4} />
        </div>
      </div>
      <div>
        <div className={styles.title}>Status</div>
        <div className={styles.content}>
          <SideBarItem title="In Progress" number={incompletedNum} index={-2} />
          <SideBarItem title="Completed" number={completedNum} index={-3} />
        </div>
      </div>
    </div>
  );
};

export default SideBarContainer;
