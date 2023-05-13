import React from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

const initialTodos = [
  { id: uuid(), task: "Learn React", complete: false },
  { id: uuid(), task: "Learn Firebase", complete: false },
  { id: uuid(), task: "Learn GraphQL", complete: true }
];

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

function App() {
  const [todos, setTodos] = React.useState(initialTodos);

  const [task, setTask] = React.useState("");

  const [filter, dispatchFilter] = React.useReducer(filterReducer, "ALL");

  const handleChangeInput = (e) => setTask(e.target.value);

  const handleChangeCheckbox = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const handleSubmit = (e) => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }

    setTask("");

    e.preventDefault();
  };

  const handleShowAll = (e) => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowComplete = (e) => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = (e) => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }

    return false;
  });

  return (
    <div>
      <form className="formStyle" onSubmit={handleSubmit}>
        <h3 className="formHeaderStyle">Todo Form</h3>
        <div className="formContentStyle">
          <strong>todo:</strong>
          <input type="text" value={task} onChange={handleChangeInput} />
          <button type="submit">Add Task</button>
        </div>
      </form>

      <div className="listContainerStyle">
        <div>
          <button type="button" onClick={handleShowAll}>
            Show All
          </button>
          <button type="button" onClick={handleShowComplete}>
            Show Complete
          </button>
          <button type="button" onClick={handleShowIncomplete}>
            Show Incomplete
          </button>
        </div>
        <ul className="listStyle">
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={(e) => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
