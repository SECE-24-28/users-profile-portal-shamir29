const DEPT_COLORS = {
  "Computer Science": "#4f46e5",
  "Electronics": "#0891b2",
  "Mechanical": "#d97706",
  "Civil": "#16a34a",
  "default": "#6b7280",
};

const avatarInitials = (name) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

export default function StudentList({ students, onView }) {
  if (students.length === 0)
    return (
      <div className="empty-state">
        <div className="empty-icon">🎓</div>
        <h2>No students yet</h2>
        <p>Click "Add Student" to register the first student.</p>
      </div>
    );

  return (
    <div>
      <div className="page-title">
        <h1>Student Profiles</h1>
        <span className="badge">{students.length} students</span>
      </div>
      <div className="student-grid">
        {students.map((s) => {
          const color = DEPT_COLORS[s.department] || DEPT_COLORS.default;
          return (
            <div key={s.id} className="student-card" onClick={() => onView(s)}>
              <div className="card-avatar" style={{ background: color }}>
                {avatarInitials(s.name)}
              </div>
              <div className="card-info">
                <h3>{s.name}</h3>
                <span className="dept-tag" style={{ background: color + "22", color }}>{s.department}</span>
                <p className="roll">{s.rollNo}</p>
                <p className="year">Year {s.year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
