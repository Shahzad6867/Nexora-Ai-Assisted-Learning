import type { RequestStatusKey } from "../../types/types";

const LABEL: Record<RequestStatusKey, string> = {
  Submitted: "Submitted",
  "In Progress" : "In Progress",
  Approved: "Approved",
  Rejected: "Rejected",
  Resubmitted : "Resubmitted"
};

const CLASS: Record<RequestStatusKey, string> = {
  Submitted: "status-pending",
  "In Progress": "status-pending",
  Approved: "status-active",
  Rejected: "status-blocked",
  Resubmitted : "status-pending"
};

export default function RequestStatusBadge({ status }: { status: RequestStatusKey }) {
  return (
    <span className={`status `}>
      <span className="status-dot" />
      {LABEL[status]}
    </span>
  );
}
