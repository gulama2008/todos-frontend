// import "./App.css";
import styles from "./App.module.scss"
import SideBarContainer from "./containers/SideBarContainer/SideBarContainer";
import TodosContainer from "./containers/TodosContainer/TodosContainer";
import TodosContextProvider from "./context/TodosContextProvider";

function App() {
  return (
    <TodosContextProvider>
      <div className={styles.container}>
        <SideBarContainer />
        <TodosContainer />
      </div>
    </TodosContextProvider>
  );
}

export default App;
