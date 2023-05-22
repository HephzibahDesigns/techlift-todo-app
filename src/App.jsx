import React, { useState } from "react";
import "./App.css";
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [active, setActive] = useState("All");
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addItem = () => {
    if (!input) {
      alert("Enter New Item");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: input,
      status: false,
    };

    setItems((prev) => [...prev, item]);
    setInput("");
  };

  const deleteTodo = (id) => {
    let reducedTodo = [...completed];

    reducedTodo.splice(id);
    setCompleted(reducedTodo);
  };

  // don't touch

  const completedTodo = (id) => {
    let newTodo = items.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }

      return item;
    });

    let updatedTodo = [...newTodo];

    setItems(updatedTodo);
    setCompleted(updatedTodo);

    console.log(updatedTodo);
  };

  return (
    <div className="App" id="#All">
      <h1 className="h1__mont">#todo</h1>

      <ul className="app__navbar">
        <li className="a__mont">
          <a
            className={active === "All" ? "active-bar" : ""}
            onClick={() => {
              setActive("All");
            }}
            href="#All"
          >
            All
          </a>
        </li>

        <li className="a__mont">
          <a
            className={active === "Active" ? "active-bar" : ""}
            onClick={() => {
              setActive("Active");
            }}
            href="#Active"
          >
            Active
          </a>
        </li>
        <li className="a__mont">
          <a
            className={active === "Completed" ? "active-bar" : ""}
            onClick={() => {
              setActive("Completed");
            }}
            href="#Completed"
          >
            Completed
          </a>
        </li>
      </ul>
      <div className="app__navbar-border active-bar"></div>

      <div className="app__input">
        <input
          type="text"
          placeholder="add details"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" onClick={addItem}>
          Add
        </button>
      </div>

      <div className="app__items">
        {active === "All" &&
          items.map((item) => (
            <div className="li__pop" key={item.id}>
              <div className="all__items">
                <div className={item.status ? " line-through" : ""}>
                  <BsCheckSquare
                    onClick={() => completedTodo(item.id)}
                    className="check-btn"
                  />
                </div>
                <p className={item.status ? " line-through value" : ""}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}

        {active === "Active" &&
          items.map(
            (item) =>
              !item.status && (
                <div className="li__pop" key={item.id}>
                  <div className="all__items">
                    <div className={item.status ? " line-through" : ""}>
                      <BsCheckSquare className="check-btn" />
                    </div>
                    <p className="value">{item.value}</p>
                  </div>
                </div>
              )
          )}

        {active === "Completed" &&
          completed.map(
            (item, index) =>
              item.status && (
                <div className="li__pop" key={index}>
                  <div className="completed-items">
                    <div className={item.status ? " line-through" : ""}>
                      <BsCheckSquareFill color="#1882d8" />

                      <p> {item.value} </p>
                    </div>
                    <div className="del-btn">
                      <AiOutlineDelete
                        onClick={() => deleteTodo(index)}
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default App;
