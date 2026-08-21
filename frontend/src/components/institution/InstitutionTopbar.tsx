interface InstitutionTopbarProps {
  name?: string;
  initials?: string;
}

export default function InstitutionTopbar({
  name = "Dubai Institute of Technology"
}: InstitutionTopbarProps) {
  const splittedName = name.split(" ")
  console.log(splittedName)
  const initials = `${splittedName[0][0]}${splittedName[1] ? splittedName[1][0] : ""}${splittedName[2] ? splittedName[2][0] : ""}`
  return (
    <header className="topbar">
      <div className="profile">
        <div className="avatar">{initials}</div>
        {name}
      </div>
    </header>
  );
}
