interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn btn-primary btn-small" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
}
