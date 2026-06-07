const avatarInitials = (name) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

export default function StudentProfile({ student, onEdit, onDelete, onBack }) {
  const handleDelete = () => {
    if (window.confirm(`Remove ${student.name} from the portal?`)) onDelete();
  };

  return (
    <div className="profile-page">
      <button className="btn-back" onClick={onBack}>← Back</button>

      <div className="profile-card">
        <div className="profile-hero">
          <div className="profile-avatar">{avatarInitials(student.name)}</div>
          <div className="profile-headline">
            <h1>{student.name}</h1>
            <span className="profile-roll">{student.rollNo}</span>
          </div>
        </div>

        <div className="profile-body">
          <div className="info-grid">
            <InfoItem icon="📧" label="Email" value={student.email} />
            <InfoItem icon="🏛️" label="Department" value={student.department} />
            <InfoItem icon="📅" label="Year" value={`Year ${student.year}`} />
            <InfoItem icon="📞" label="Phone" value={student.phone} />
          </div>

          {student.bio && (
            <div className="bio-section">
              <h3>About</h3>
              <p>{student.bio}</p>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="btn btn-secondary" onClick={onEdit}>✏️ Edit Profile</button>
          <button className="btn btn-danger" onClick={handleDelete}>🗑️ Remove</button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="info-item">
      <span className="info-icon">{icon}</span>
      <div>
        <div className="info-label">{label}</div>
        <div className="info-value">{value}</div>
      </div>
    </div>
  );
}
