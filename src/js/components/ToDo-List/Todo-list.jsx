import React, { useState, useEffect } from "react";

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
      { method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            "label": tasks,
            "is_done": false
          }),
      }
    );
    console.log(response)
    const data = await response.json();
    console.log(data)
    fetchTasks ();
    setTasks ("");
  };

  const deleteTask = async (todo_id) => {
    let response = await fetch(
      `https://playground.4geeks.com/todo/todos/${todo_id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      setTasksList((prev) => {
        return prev.filter((task) => task.id !== todo_id);
      });
    } else {
      console.log("Error deleting task");
    }
  };

  const showList = () => {
    let mapList = tasksList.map((task) => {
      return <li key={task.id}>{task.label}
      <span onClick={() => deleteTask(task.id)}>🗑</span>
      </li>;
    });
    return mapList;
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
      }
      };

  return (
    <div className="container mt-5">
      <h1>MY TO DO LIST</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={addTask}>Add task</button>
      <div>
        <ul>{showList()}</ul>
      </div>
    </div>
  );
};

export default Todolist;
