import { useEffect, useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([...tasks, yeniTask]);
    toast.success("Yeni task eklendi");
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const taskDone = tasks.find((task) => task.id == id);
    taskDone.status = "yapıldı";
    setTasks([...tasks]);
    toast.success("Tebrikler task tamamlandı");
    const activeTasks = tasks.filter((task) => task.status === "yapılacak");
    if (activeTasks.length == 0) {
      toast.info("Hiç aktif task kalmadı", { theme: "light" });
    }
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm
            kisiler={team}
            id={tasks[tasks.length - 1].id + 1}
            submitFn={handleTaskSubmit}
          />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
