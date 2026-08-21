interface AdminTopbarProps {
  adminName?: string;
  adminInitials?: string;
}

export default function AdminTopbar({
  adminName = "Super Admin",
  adminInitials = "SA",
}: AdminTopbarProps) {
  return (
    <header className="topbar">

      <div className="profile">
        <div className="avatar">{adminInitials}</div>
        {adminName}
      </div>
    </header>
  );
}
