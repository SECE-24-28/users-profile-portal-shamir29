import { useState } from "react";

const DEPTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Information Technology"];

const empty = { name: "", email: "", rollNo: "", department: "Computer Science", year: 1, phone: "", bio: "" };

export default function StudentForm({ student, onSubmit, onCancel }) {
  const [form, setForm] = useState(student || empty);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.rollNo.trim()) e.rollNo = "Roll number is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit({ ...form, year: Number(form.year) });
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="form-page">
      <h1>{student ? "Edit Profile" : "Register Student"}</h1>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field label="Full Name" error={errors.name}>
            <input value={form.name} onChange={set("name")} placeholder="e.g. Rahul Kumar" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input value={form.email} onChange={set("email")} placeholder="student@college.edu" />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Roll Number" error={errors.rollNo}>
            <input value={form.rollNo} onChange={set("rollNo")} placeholder="e.g. CS22B001" />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Department">
            <select value={form.department} onChange={set("department")}>
              {DEPTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Year of Study">
            <select value={form.year} onChange={set("year")}>
              {[1, 2, 3, 4].map((y) => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Bio (optional)">
          <textarea value={form.bio} onChange={set("bio")} rows={3} placeholder="A short intro about the student..." />
        </Field>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">{student ? "Save Changes" : "Register"}</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
