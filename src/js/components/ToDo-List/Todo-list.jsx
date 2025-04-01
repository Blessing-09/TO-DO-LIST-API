import React, { useState, useEffect } from "react";
import "./Todo-list.css";

const Todolist = () => {
  const [tasks, setTasks] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/Blessing",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      createUser();
      return; // stop execution
    }

    const data = await response.json();
    console.log(data);
    setTasksList(data.todos);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createUser = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/todo/users/Blessing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const addTask = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/todo/todos/Blessing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: tasks,
          is_done: false,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    fetchTasks();
    setTasks("");
  };

  const deleteTask = async (todo_id) => {
    let response = await fetch(
      `https://playground.4geeks.com/todo/todos/${todo_id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    if (response.ok) {
      setTasksList((prev) => prev.filter((task) => task.id !== todo_id));
    } else {
      console.log("Error deleting task");
    }
  };

  const showList = () => {
    let mapList = tasksList.map((item) => {
      return (
        <li className="col-12 singleList mt-1" key={item.id}>
          {item.label}
          <button onClick={() => deleteTask(item.id)}>🗑</button>
        </li>
      );
    });
    return mapList;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-between align-items-center">
      <h1 className="bg-secondary px-3 py-2">
        <span className="totalTask mx-2">{tasksList.length}</span>MY-TO-DO-LIST{" "}
        <span className="totalTask">{tasksList.length > 0 ? "🔋" : "🪫"}</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="mx-1" onClick={addTask}>
          Add task
        </button>
      </div>
      <div className="container mt-3">
        <ul className="row taskBox">{showList()}</ul>
      </div>
    </div>
  );
};

export default Todolist;
