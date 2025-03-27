import React, { useState, useEffect } from 'react';

const Todolist = () => {
    const [tasks, setTasks] = useState("");
    const [tasksList, setTasksList] = useState([]);

    const fetchTasks = async () => {
        let response = await fetch('https://playground.4geeks.com/todo/users/Blessing');
        console.log(response);
        let data = await response.json();
        console.log(data);
    }
        const addTask = () => {
            if(tasks !== "") {
            setTasksList(() => [...tasksList, tasks]);
            setTasks("");
            }
        }

        const showList = () => {
           let mapList = tasksList.map((tasklist, index) => {
            return  <li key = {index}>{tasklist}</li>
           });
           return mapList;
        }
        
    return (
        <div>
           <h1>MY TO DO LIST</h1> 
        <input
            type = "text"
            placeholder = "Enter a task"
            value = {tasks}
            onChange={(e) => setTasks(e.target.value)}
        />
            <button onClick={addTask}>
                Add task
            </button>
            <div>
                <ul>
                {showList()}
                </ul>
                
            </div>

        </div>
     
    );
};

export default Todolist;