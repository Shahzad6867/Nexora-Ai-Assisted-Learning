import { useState } from "react";
import { NEXT_STATUS_OPTIONS, type RequestStatusKey } from "../../types/types";

interface StatusChangerProps {
  currentStatus: RequestStatusKey;
  onChangeStatus: (next: RequestStatusKey, note: string) => void;
}

// Lets the admin move a request to its next valid status.
// Picking "Reject" always requires a written reason before it commits —
// every other transition applies as soon as "Update Status" is clicked.
export default function StatusChanger({ currentStatus, onChangeStatus }: StatusChangerProps) {
  const options = NEXT_STATUS_OPTIONS[currentStatus];
  const [selected, setSelected] = useState<RequestStatusKey | "">("");
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  if (options.length === 0) {
    return (
      <p className="status-terminal-note">
        This request is finalized and no further status changes are available.
      </p>
    );
  }

  function handleUpdateClick() {
    if (!selected) return;
    if (selected === "Rejected") {
      setShowReject(true);
      return;
    }
    onChangeStatus(selected, "");
    setSelected("");
  }

  function handleConfirmReject() {
    if (!reason.trim()) {
      setReasonError("A rejection reason is required.");
      return;
    }
    onChangeStatus("Rejected", reason.trim());
    setSelected("");
    setShowReject(false);
    setReason("");
    setReasonError(null);
  }

  function handleCancelReject() {
    setShowReject(false);
    setReason("");
    setReasonError(null);
  }

  return (
    <div>
      <div className="status-changer">
        <select value={selected} onChange={(e) => setSelected(e.target.value as RequestStatusKey | "")}>
          <option value="">Select new status...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary btn-small" disabled={!selected} onClick={handleUpdateClick}>
          Update Status
        </button>
      </div>

      {showReject && (
        <div className="reject-panel">
          <label>Reason for rejection (required)</label>
          <textarea
            placeholder="Explain what needs to change before this can be approved..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (reasonError) setReasonError(null);
            }}
          />
          {reasonError && <div className="field-error">{reasonError}</div>}
          <div className="reject-panel-actions">
            <button className="btn btn-secondary btn-small" onClick={handleCancelReject}>
              Cancel
            </button>
            <button className="btn btn-danger btn-small" onClick={handleConfirmReject}>
              Confirm Rejection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
