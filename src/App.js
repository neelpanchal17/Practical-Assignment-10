import "./index.css";
import React from "react";
import { useState,useEffect} from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginForm from "./component/LoginForm";
import About from "./component/About";
import Header from "./component/Header";
import Footer from "./component/Footer";
import AddTask from "./component/AddTask";
import Tasks from "./component/Tasks";

function App ()  {
  const User ={
    username:"neel",
    password:"neel123"
  }
  const [user,setUser]=useState({username:"",password:""});
  const [error,setError]=useState("");

  const Login = det =>{
    console.log(det);

    if(det.username === User.username && det.password === User.password){
      console.log("Logged In");
      setUser({
        username:det.username,
        password:det.password,
      });
    }
    else{
      console.log("not found.");
      setError("UserName or Password Wrong.");
    }
  }

  const Logout =() =>{
    setUser({username:"",password:""});
  }
  //task add
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks =async() => {
      const taskFromServer =await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])
 
  //fetch task
  const fetchTasks = async() => {
    const res=await fetch('http://localhost:5000/tasks')
    const data=await res.json()
    return data;
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  return (
    <div className="container">
      {(user.username !== "") ? (
            <div className="welcome">
            <Router>
              <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
              />
                <Routes>
                <Route path='/' element={
                  <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                    ) : ("No Task To Show")}
                  </>
                }
             />
      <Route path='/about' element={<About />} />
                </Routes>
              <Footer/>  
            </Router>
            <br/>
            <button onClick={Logout}>Logout</button>
            </div>
          
      ):(
        <LoginForm Login={Login} error={error}/>
      )}
      
    </div>
  );
};
export default App;
