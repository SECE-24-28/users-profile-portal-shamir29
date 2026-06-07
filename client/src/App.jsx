import { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentProfile from "./components/StudentProfile";
import "./App.css";

const API = "http://localhost:5000/api/students";

export default function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("list"); // list | add | profile | edit
  const [selected, setSelected] = useState(null);

  const fetchStudents = () =>
    fetch(API).then((r) => r.json()).then(setStudents);

  useEffect(() => { fetchStudents(); }, []);

  const handleAdd = async (data) => {
    await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    fetchStudents();
    setView("list");
  };

  const handleUpdate = async (data) => {
    await fetch(`${API}/${selected.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    fetchStudents();
    setView("list");
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchStudents();
    setView("list");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">🎓 StudentHub</span>
          <button className="btn btn-primary" onClick={() => setView("add")}>+ Add Student</button>
        </div>
      </header>

      <main className="app-main">
        {view === "list" && (
          <StudentList
            students={students}
            onView={(s) => { setSelected(s); setView("profile"); }}
          />
        )}
        {view === "add" && (
          <StudentForm onSubmit={handleAdd} onCancel={() => setView("list")} />
        )}
        {view === "profile" && selected && (
          <StudentProfile
            student={selected}
            onEdit={() => setView("edit")}
            onDelete={() => handleDelete(selected.id)}
            onBack={() => setView("list")}
          />
        )}
        {view === "edit" && selected && (
          <StudentForm student={selected} onSubmit={handleUpdate} onCancel={() => setView("profile")} />
        )}
      </main>
    </div>
  );
}
