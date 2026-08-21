import type { StatusKind } from "../../types/types";

const STATUS_LABEL: Record<StatusKind, string> = {
  active: "Active",
  pending: "Pending Review",
  "Pending Approval": "Pending Approval",
  suspended: "Suspended",
  blocked: "Blocked",
};

const STATUS_CLASS: Record<StatusKind, string> = {
  active: "status-active",
  pending: "status-pending",
  "Pending Approval": "status-pending",
  suspended: "status-blocked",
  blocked: "status-blocked",
};

interface StatusBadgeProps {
  status: StatusKind;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`status ${STATUS_CLASS[status]}`}>
      <span className="status-dot" />
      {label ?? STATUS_LABEL[status]}
    </span>
  );
}
